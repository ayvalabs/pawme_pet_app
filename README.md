# PawMe - Pet Parent Mobile App 🐾

A React Native Expo app for pet parents that helps identify pet breeds and provides comprehensive care guidance.

## Features

### 🎯 Core Features
- **Pet Breed Recognition**: Take a photo of your cat or dog and the app automatically identifies the breed
- **Breed-Specific Tips**: Get customized advice based on your pet's breed including:
  - Communication tips
  - Training guidance
  - Health issues to watch for
  - Food recipes
  - Exercise requirements
  - Seasonal care tips

### 🏥 Health & Wellness
- **Health Tips**: Self-managed health tips for your pet's breed
- **Food Recipes**: Breed-appropriate meal suggestions
- **Vets Network**: Find nearby veterinarians and pet care services

### 🎉 Community
- **Playdates**: Schedule and join pet playdates in your area
- **Pet Parent Groups**: Connect with other pet parents

### 🛒 Daily Supplies
- Browse and shop for pet supplies

### 📹 Pet Monitoring (Matter Compatible)
- **IP Camera Integration**: Works with any Matter-compatible IP camera
- **Universal Support**: Compatible with Ring, Nest, Arlo, Wyze, TP-Link, and any RTSP camera
- **Live Streaming**: Watch your pets from anywhere

## Supported Breeds

### Dogs
- Golden Retriever
- Labrador Retriever
- German Shepherd
- French Bulldog
- Beagle

### Cats
- Persian Cat
- Maine Coon
- Siamese
- British Shorthair
- Ragdoll

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- Expo CLI
- iOS Simulator or Android Emulator (or physical device with Expo Go)

### Installation

```bash
# Navigate to project directory
cd PawMe

# Install dependencies
pnpm install

# Start the development server
pnpm start
```

### Running the App

```bash
# Start Expo development server
pnpm start

# Run on iOS
pnpm run ios

# Run on Android
pnpm run android

# Run on Web
pnpm run web
```

## Project Structure

```
PawMe/
├── App.tsx                 # Main app component with navigation
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── BottomNav.tsx
│   │   ├── ImageWithFallback.tsx
│   │   └── InsightItem.tsx
│   ├── screens/            # App screens
│   │   ├── OnboardingScreen.tsx
│   │   ├── CameraScreen.tsx
│   │   ├── AnalyzingScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── HealthScreen.tsx
│   │   ├── SmartHomeScreen.tsx
│   │   ├── CommunityScreen.tsx
│   │   └── SuppliesScreen.tsx
│   ├── data/
│   │   └── breedData.ts    # Breed information database
│   ├── types/
│   │   └── index.ts        # TypeScript type definitions
│   └── utils/
│       └── colors.ts       # Color palette
├── app.json                # Expo configuration
├── babel.config.js         # Babel configuration
└── package.json
```

## Technologies Used

- **React Native** with **Expo**
- **TypeScript**
- **Firebase** - Authentication, Firestore, Realtime Database, Storage
- **expo-camera** - Camera access for pet photos
- **expo-image-picker** - Photo library access
- **expo-linear-gradient** - Beautiful gradient backgrounds
- **expo-apple-authentication** - Apple Sign-In
- **expo-auth-session** - OAuth flows for Google Sign-In
- **react-native-reanimated** - Smooth animations
- **lucide-react-native** - Beautiful icons
- **react-native-safe-area-context** - Safe area handling

## Authentication

The app supports multiple authentication methods:

### Email/Password
- Sign up with email, password, and display name
- Sign in with existing credentials
- Password reset via email

### Google Sign-In
To enable Google Sign-In:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials for iOS and Android
3. Update the client IDs in `src/contexts/AuthContext.tsx`

### Apple Sign-In (iOS only)
- Enabled by default on iOS devices
- Requires Apple Developer account for production
- Uses `expo-apple-authentication`

### Firebase Setup
The app is pre-configured with Firebase. To use your own Firebase project:
1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication methods (Email/Password, Google, Apple)
3. Update credentials in `src/config/firebase.ts`

## Matter Protocol Integration

The app supports Matter-compatible IP cameras for pet monitoring. Matter is a universal smart home protocol that ensures interoperability between devices from different manufacturers.

### Supported Camera Brands
- Ring
- Nest/Google
- Arlo
- Wyze
- TP-Link Tapo
- Any RTSP-compatible camera

### Adding a Camera
1. Navigate to the "Monitoring" section
2. Tap the + button
3. Enter your camera's name and IP address
4. The app will auto-discover Matter-compatible devices on your network

## License

MIT License

## Made with ❤️ for pet parents everywhere!
