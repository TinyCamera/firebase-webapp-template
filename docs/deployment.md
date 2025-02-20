# Deployment Guide

This guide walks through the process of deploying the Firebase web application to production.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Firebase CLI](https://firebase.google.com/docs/cli) installed globally
  ```bash
  npm install -g firebase-tools
  ```
- Firebase account and project created at [Firebase Console](https://console.firebase.google.com)
- Firebase CLI logged in
  ```bash
  firebase login
  ```

## Firebase Project Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)

2. Update `.firebaserc` with your project ID:

   ```json
   {
     "projects": {
       "default": "your-firebase-project-id"
     }
   }
   ```

3. Enable required Firebase services:

   - Authentication (for user management)
   - Firestore (for database)
   - Functions (for server deployment)

4. Generate a new Service Account key:
   - Go to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely

## Environment Configuration

### Client Configuration (packages/client/.env)

Create a `.env` file in the `packages/client` directory with the following variables:

```env
# Firebase Configuration (from Firebase Console > Project Settings)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

# API Configuration
VITE_API_URL=https://your-region-your-project.cloudfunctions.net

# Environment
VITE_NODE_ENV=production
```

### Server Configuration (packages/server/.env)

Create a `.env` file in the `packages/server` directory with the following variables:

```env
# Firebase (required for production)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# OpenRouter Configuration (if using)
OPENROUTER_API_KEY=your-api-key
OPENROUTER_BASE_URL=https://api.openrouter.ai/api/v1
OPENROUTER_DEFAULT_MODEL=mistral-7b-instruct

# Server Configuration
NODE_ENV=production
PORT=5001
```

## Build Process

1. Install dependencies in all packages:

   ```bash
   npm install
   ```

2. Build all packages:

   ```bash
   npm run build
   ```

   This will:

   - Build the shared package
   - Build the client for production
   - Build the server functions

## Deployment Steps

1. Deploy to Firebase:

   ```bash
   firebase deploy
   ```

   This will:

   - Deploy Firebase Functions (server)
   - Upload function configuration
   - Deploy Firebase configuration

2. Verify deployment:
   - Check Firebase Console for successful deployment
   - Visit your deployed application at `https://your-project-id.web.app`
   - Test core functionality (authentication, data operations)

## Environment Updates

If you need to update environment variables after deployment:

1. Update Firebase Functions configuration:

   ```bash
   firebase functions:config:set key=value
   ```

2. Redeploy functions:
   ```bash
   firebase deploy --only functions
   ```

## Troubleshooting

Common issues and solutions:

### Build Errors

- **Error**: Module not found
  - Solution: Ensure all dependencies are installed
  - Run `npm install` in the root directory

### Deployment Errors

- **Error**: Functions deployment failed

  - Solution: Check Firebase CLI is logged in
  - Verify environment variables are set correctly
  - Check build output for errors

- **Error**: Permission denied
  - Solution: Verify Firebase project permissions
  - Check service account has necessary roles

### Runtime Errors

- **Error**: API calls failing
  - Solution: Verify API URL in client configuration
  - Check Functions logs in Firebase Console
  - Verify environment variables are set correctly

## Monitoring

After deployment, monitor your application using:

- Firebase Console > Functions > Logs
- Firebase Console > Authentication > Users
- Firebase Console > Firestore > Data
- Firebase Console > Analytics (if configured)

## Security Considerations

1. Ensure all sensitive environment variables are properly set in Firebase Functions configuration
2. Keep service account keys secure and never commit them to version control
3. Review Firebase Security Rules for Firestore
4. Monitor Firebase Console for any unauthorized access attempts
5. Regularly update dependencies for security patches

## Support

For issues or questions:

1. Check Firebase documentation: https://firebase.google.com/docs
2. Review Firebase status: https://status.firebase.google.com/
3. Search Firebase GitHub issues: https://github.com/firebase/firebase-js-sdk/issues
