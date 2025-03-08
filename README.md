# Task Manager App

A simple mobile task manager application built with React Native that allows users to create, manage, and track their tasks.

## Features

- Add tasks with title and description
- Mark tasks as complete/incomplete
- Delete tasks
- Persistent storage using Express.js backend
- Modern UI with custom components
- Icon support

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Yarn](https://yarnpkg.com/) package manager
- [React Native development environment](https://reactnative.dev/docs/environment-setup)
  - For iOS: Xcode (Mac only)
  - For Android: Android Studio and Android SDK

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd HHTK
```

2. Install dependencies:

```bash
yarn install
```

3. iOS specific setup:

```bash
cd ios
pod install
cd ..
```

4. Configure vector icons:
   - iOS: Already configured in Podfile
   - Android: Already configured in android/app/build.gradle

## Running the App

1. Start the backend server:

```bash
yarn server
```

2. In a new terminal, start the Metro bundler:

```bash
yarn start
```

3. In another terminal, run the app:

For iOS:

```bash
yarn ios
```

For Android:

```bash
yarn android
```

## Project Structure

```
src/
├── assets/
│   └── icons/        # Icon components
├── common/           # Reusable components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Input.tsx
├── constants/        # App constants
│   └── colors.ts
├── screens/          # App screens
│   └── TaskListScreen.tsx
└── services/         # API services
    └── api.ts

backend/
├── server.js         # Express server
└── data/
    └── tasks.json    # JSON database
```

## Available Scripts

- `yarn start`: Start the Metro bundler
- `yarn ios`: Run the app on iOS simulator
- `yarn android`: Run the app on Android emulator/device
- `yarn server`: Start the backend server
- `yarn test`: Run tests
- `yarn lint`: Run ESLint

## Tech Stack

- React Native
- TypeScript
- Express.js
- React Native Vector Icons
- Axios

## Common Issues and Solutions

1. If icons are not showing:

   - For iOS: Run `cd ios && pod install`
   - For Android: Clean and rebuild the project

2. If the backend is not connecting:

   - Ensure the server is running (`yarn server`)
   - Check if the API_URL in `src/services/api.ts` matches your local setup

3. Metro bundler issues:
   - Clear Metro cache: `yarn start --reset-cache`

## Development

To add new features or modify existing ones:

1. Backend changes:

   - Modify `backend/server.js` for API changes
   - Data is stored in `backend/data/tasks.json`

2. Frontend changes:
   - Components are in `src/common/`
   - Screens are in `src/screens/`
   - API calls are in `src/services/api.ts`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
