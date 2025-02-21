# New Project Setup

When creating a new project from this template, the following files and configurations need to be updated:

## 1. Package Names

Replace all instances of `firebase-webapp-template` with your new project name in the following files:

### Root Directory

- `package.json`
  ```json
  {
    "name": "your-project-name"
  }
  ```

### Client Package

- `packages/client/package.json`
  ```json
  {
    "name": "@your-project-name/client",
    "dependencies": {
      "@your-project-name/shared": "1.0.0"
    }
  }
  ```

### Server Package

- `packages/server/package.json`
  ```json
  {
    "name": "@your-project-name/server",
    "dependencies": {
      "@your-project-name/shared": "file:./lib/shared"
    }
  }
  ```

### Shared Package

- `packages/shared/package.json`
  ```json
  {
    "name": "@your-project-name/shared"
  }
  ```

## 2. Firebase Configuration

### Firebase Project Settings

- `.firebaserc`
  ```json
  {
    "projects": {
      "default": "your-firebase-project-id"
    }
  }
  ```

### Client Environment Variables

Create `packages/client/.env` from `.env.example` and update:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## 3. Server Configuration

Create `packages/server/.env` from `.env.example` and update:

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# Update if using OpenRouter
OPENROUTER_API_KEY=your-api-key

# Update if using a different port
PORT=5001
```

## 4. API Configuration

### Client API URL

In `packages/client/.env`:

```
VITE_API_URL=http://localhost:5001  # Update if using a different API endpoint
```

### Code Updates

Search for and update any hardcoded API URLs in the codebase if they exist.

---

After making these changes, run `npm install` in the root directory to update dependencies with the new package names.
