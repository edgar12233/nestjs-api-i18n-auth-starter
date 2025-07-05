# NestJS API i18n Auth Starter 🚀

Welcome to the **NestJS API i18n Auth Starter**! This project serves as a solid foundation for building multilingual REST APIs using NestJS. It features seamless integration with i18next for internationalization, robust validation mechanisms, and Google OAuth for secure authentication. 

[![Releases](https://img.shields.io/github/release/edgar12233/nestjs-api-i18n-auth-starter.svg)](https://github.com/edgar12233/nestjs-api-i18n-auth-starter/releases)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Multilingual Support**: Built-in support for multiple languages using i18next.
- **Google OAuth**: Easy integration with Google for user authentication.
- **Validation**: Strong validation capabilities to ensure data integrity.
- **RESTful API**: Follows REST principles for clear and efficient API design.
- **Modular Architecture**: Organized code structure for easy maintenance and scalability.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or later)
- npm or yarn
- A Google account for OAuth setup

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/edgar12233/nestjs-api-i18n-auth-starter.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nestjs-api-i18n-auth-starter
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

   or 

   ```bash
   yarn install
   ```

### Configuration

1. Create a `.env` file in the root directory and add your environment variables. Here's a sample configuration:

   ```env
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   JWT_SECRET=your-jwt-secret
   ```

2. Replace the placeholders with your actual Google OAuth credentials and a secret for JWT.

## Usage

To start the application, run:

```bash
npm run start:dev
```

or 

```bash
yarn start:dev
```

The application will run on `http://localhost:3000`. You can modify the port in the configuration if needed.

## API Endpoints

### Authentication

- **POST /auth/login**: Login with Google OAuth.
- **GET /auth/logout**: Logout the current user.

### Internationalization

- **GET /i18n/:lang**: Get translations for the specified language.

### Validation

- **POST /validate**: Validate incoming data against defined schemas.

## Testing

To run tests, use:

```bash
npm run test
```

or 

```bash
yarn test
```

This will execute the test suite and provide you with a report of the results.

## Contributing

We welcome contributions! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the NestJS community for their amazing framework.
- Special thanks to the i18next team for their excellent internationalization library.
- A big shoutout to Google for providing OAuth services that enhance our application's security.

For more details, check the [Releases](https://github.com/edgar12233/nestjs-api-i18n-auth-starter/releases) section for updates and new features.

## Conclusion

The **NestJS API i18n Auth Starter** project provides a comprehensive starting point for developers looking to build multilingual REST APIs. With its robust features and clear structure, you can focus on developing your application without worrying about the foundational setup.

Explore the code, make improvements, and build something great!