import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useAuth } from '../contexts/AuthContext';
import { Button, PawIcon } from '../components';
import colors from '../utils/colors';

interface LoginScreenProps {
  onSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const { signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithApple, error, clearError, loading } = useAuth();

  const handleEmailAuth = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Info', 'Please enter email and password');
      return;
    }

    if (!isLogin && !displayName.trim()) {
      Alert.alert('Missing Info', 'Please enter your name');
      return;
    }

    try {
      setLocalLoading(true);
      clearError();
      
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, displayName);
      }
      onSuccess();
    } catch (err) {
      // Error is handled by context
    } finally {
      setLocalLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLocalLoading(true);
      clearError();
      await signInWithGoogle();
      // onSuccess will be called by auth state change
    } catch (err) {
      // Error is handled by context
    } finally {
      setLocalLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setLocalLoading(true);
      clearError();
      await signInWithApple();
      // onSuccess will be called by auth state change
    } catch (err) {
      // Error is handled by context
    } finally {
      setLocalLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      Alert.alert('Enter Email', 'Please enter your email address first');
      return;
    }
    Alert.alert(
      'Reset Password',
      `Send password reset email to ${email}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send', 
          onPress: async () => {
            try {
              const { resetPassword } = useAuth();
              await resetPassword(email);
              Alert.alert('Email Sent', 'Check your inbox for password reset instructions');
            } catch (err) {
              // Error handled by context
            }
          }
        },
      ]
    );
  };

  const isLoading = loading || localLoading;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <PawIcon size={100} variant="filled" />
          <Text style={styles.title}>
            <Text style={styles.titlePaw}>PAW</Text>
            <Text style={styles.titleMe}>ME</Text>
          </Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Welcome back, pet parent!' : 'Join the pet parent family!'}
          </Text>
        </View>

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Form */}
        <View style={styles.form}>
          {!isLogin && (
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <User size={20} color={colors.pink400} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                placeholderTextColor={colors.pink300}
                value={displayName}
                onChangeText={setDisplayName}
                autoCapitalize="words"
                editable={!isLoading}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Mail size={20} color={colors.pink400} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.pink300}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Lock size={20} color={colors.pink400} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.pink300}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!isLoading}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color={colors.pink300} />
              ) : (
                <Eye size={20} color={colors.pink300} />
              )}
            </TouchableOpacity>
          </View>

          {isLogin && (
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          {/* Email Auth Button */}
          <Button 
            onPress={handleEmailAuth} 
            style={styles.authButton}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.authButtonText}>
                {isLogin ? 'Sign In' : 'Create Account'}
              </Text>
            )}
          </Button>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Auth Buttons */}
          <View style={styles.socialButtons}>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={handleGoogleSignIn}
              disabled={isLoading}
            >
              <Text style={styles.socialIcon}>G</Text>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>

            {Platform.OS === 'ios' && (
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={16}
                style={styles.appleButton}
                onPress={handleAppleSignIn}
              />
            )}
          </View>

          {/* Toggle Login/Signup */}
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={() => {
              setIsLogin(!isLogin);
              clearError();
            }}>
              <Text style={styles.toggleLink}>
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pink50,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.pink400,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.pink400,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
    marginBottom: 16,
  },
  pawIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
    marginBottom: 8,
  },
  titlePaw: {
    color: colors.pink600,
  },
  titleMe: {
    color: colors.pink400,
  },
  subtitle: {
    color: 'rgba(131, 24, 67, 0.6)',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.rose500,
  },
  errorText: {
    color: colors.rose500,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.pink100,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.pink900,
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: colors.pink500,
    fontSize: 14,
    fontWeight: '600',
  },
  authButton: {
    marginTop: 8,
  },
  authButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.pink200,
  },
  dividerText: {
    color: colors.pink300,
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  socialButtons: {
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: colors.pink100,
    gap: 8,
  },
  socialIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4285F4',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.pink900,
  },
  appleButton: {
    height: 50,
    borderRadius: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  toggleText: {
    color: colors.pink400,
    fontSize: 14,
  },
  toggleLink: {
    color: colors.pink600,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default LoginScreen;
