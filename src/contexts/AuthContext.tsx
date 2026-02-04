import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { AuthContextType, AuthUser, mapFirebaseUser } from '../types/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Google Sign-In configuration
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: 'YOUR_IOS_CLIENT_ID', // Replace with your iOS client ID from Google Cloud Console
    androidClientId: 'YOUR_ANDROID_CLIENT_ID', // Replace with your Android client ID
    webClientId: '609473314845-YOUR_WEB_CLIENT_ID.apps.googleusercontent.com', // Replace with your web client ID
  });

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapFirebaseUser(firebaseUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle Google Sign-In response
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(async (result) => {
          await saveUserToFirestore(result.user);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [response]);

  // Save user data to Firestore
  const saveUserToFirestore = async (firebaseUser: User) => {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        providerId: firebaseUser.providerData[0]?.providerId || 'email',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(userRef, {
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      }, { merge: true });
    }
  };

  // Email/Password Sign In
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      await saveUserToFirestore(result.user);
    } catch (err: any) {
      setError(getErrorMessage(err.code));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Sign Up
  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(result.user, { displayName });
      
      // Save to Firestore
      await saveUserToFirestore(result.user);
      
      // Update local user state with display name
      setUser(mapFirebaseUser({ ...result.user, displayName } as User));
    } catch (err: any) {
      setError(getErrorMessage(err.code));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const signInWithGoogle = async () => {
    try {
      setError(null);
      await promptAsync();
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Apple Sign In
  const signInWithApple = async () => {
    try {
      setError(null);
      
      if (Platform.OS !== 'ios') {
        setError('Apple Sign-In is only available on iOS devices');
        return;
      }

      // Generate nonce for security
      const nonce = Math.random().toString(36).substring(2, 10);
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce
      );

      // Request Apple authentication
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });

      // Create Firebase credential
      const { identityToken } = appleCredential;
      if (!identityToken) {
        throw new Error('No identity token received from Apple');
      }

      const provider = new OAuthProvider('apple.com');
      const credential = provider.credential({
        idToken: identityToken,
        rawNonce: nonce,
      });

      // Sign in with Firebase
      const result = await signInWithCredential(auth, credential);
      
      // Update display name if provided by Apple (only on first sign-in)
      if (appleCredential.fullName?.givenName) {
        const displayName = `${appleCredential.fullName.givenName} ${appleCredential.fullName.familyName || ''}`.trim();
        await updateProfile(result.user, { displayName });
      }

      await saveUserToFirestore(result.user);
    } catch (err: any) {
      if (err.code === 'ERR_CANCELED') {
        // User cancelled, don't show error
        return;
      }
      setError(err.message);
      throw err;
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
      setUser(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Reset Password
  const resetPassword = async (email: string) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      setError(getErrorMessage(err.code));
      throw err;
    }
  };

  // Clear Error
  const clearError = () => setError(null);

  // Get user-friendly error messages
  const getErrorMessage = (code: string): string => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Try signing in instead.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/operation-not-allowed':
        return 'This sign-in method is not enabled.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-credential':
        return 'Invalid email or password.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithApple,
    signOut,
    resetPassword,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
