import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth,
  initializeAuth,
  browserLocalPersistence,
  browserSessionPersistence,
  indexedDBLocalPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyC8oFq2FeOBvJsA7q7p4cBUAHZL7COKAoY",
  authDomain: "pawme-bc0a0.firebaseapp.com",
  databaseURL: "https://pawme-bc0a0-default-rtdb.firebaseio.com",
  projectId: "pawme-bc0a0",
  storageBucket: "pawme-bc0a0.firebasestorage.app",
  messagingSenderId: "609473314845",
  appId: "1:609473314845:web:7d88a08affcbfa5e4686f4",
  measurementId: "G-G1M8W2RRG6"
};

// Initialize Firebase (only if not already initialized)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Realtime Database
const realtimeDb = getDatabase(app);

// Initialize Storage
const storage = getStorage(app);

export { app, auth, db, realtimeDb, storage };
