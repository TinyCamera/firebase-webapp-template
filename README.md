# Firebase Web App Template

A modern, full-stack web application template using Firebase, React, and TypeScript. This template includes authentication, Material-UI components, OpenRouter AI integration, and a modular project structure.

## Features

- 🔥 Firebase Integration (Auth, Firestore, Functions)
- ⚛️ React with TypeScript
- 🎨 Material-UI & Tailwind CSS
- 🔄 Redux + Redux Saga for state management
- 🤖 OpenRouter AI integration
- 🔐 Authentication with Google Sign-in
- 📦 Monorepo structure with shared types and utilities
- 🚀 Vite for fast development
- ✨ Modern development tools and best practices

## Project Structure

```
firebase-webapp-template/
├── packages/
│   ├── client/          # React frontend
│   ├── server/          # Firebase Functions backend
│   └── shared/          # Shared types and utilities
├── .firebaserc          # Firebase project config
├── firebase.json        # Firebase service config
└── package.json         # Root workspace config
```

## Getting Started

1. Clone this template:

   ```bash
   git clone <repository-url> your-project-name
   cd your-project-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Copy `.env.example` to `.env` in both client and server packages
   - Update the variables with your Firebase and OpenRouter credentials

4. Set up Firebase:

   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Google provider) and Firestore
   - Update `.firebaserc` with your project ID
   - Add your Firebase config to the client .env file

5. Set up OpenRouter (optional):

   - Get an API key from [OpenRouter](https://openrouter.ai)
   - Add the API key to the server .env file

6. Start development servers:

   ```bash
   # Start Firebase emulators
   cd packages/server
   npm run serve

   # In another terminal, start the client
   cd packages/client
   npm run dev
   ```

## Development

- **Client**: The React application lives in `packages/client`

  - Uses Vite for development
  - Redux + Redux Saga for state management
  - Material-UI components
  - Tailwind CSS for styling

- **Server**: Firebase Functions in `packages/server`

  - Express.js for API routes
  - TypeScript for type safety
  - OpenRouter integration for AI features

- **Shared**: Common code in `packages/shared`
  - Types shared between client and server
  - Utility functions
  - Constants

## Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Adding Features

The template follows a modular structure:

1. Add new features in `packages/client/src/features/`
2. Add new API endpoints in `packages/server/src/modules/`
3. Share types and utilities in `packages/shared/src/`

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
