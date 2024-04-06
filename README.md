# MERN Stack URL Shortener

This is a URL shortener application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Overview

The application works by taking a URL from the user, generating a unique ID for it. A shortened URL is then created using this unique ID. When this shortened URL is accessed, the user is redirected to the original URL.

In addition to shortening URLs, the application also provides a feature to view all shortened URLs.

## How to Use

1. Enter the URL you want to shorten in the input field.
2. Click the "Shorten" button.
3. The application will generate a unique ID for the URL and store it in the database.
4. You will receive a shortened URL in the form of `http://yourdomain.com/uniqueID`.
5. When a user searches for the shortened URL, the application will redirect to the original URL.
6. To view all shortened URLs, navigate to the 'All' page.

## Installation and Setup

1. Ensure that Node.js and MongoDB are installed on your system.
2. Clone this repository.
3. Navigate to the `server` directory.
4. Rename the `.env.example` file to `.env`. Fill in the necessary environment variables.
5. Install the server dependencies with `npm install`.
6. Start the server with `npm start`.
7. In a new terminal window, navigate to the `client` directory.
8. Rename the `.env.example` file to `.env`. Fill in the necessary environment variables.
9. Install the client dependencies with `npm install`.
10. Start the client with `npm start`.
11. The application will be running at `http://localhost:3000`.


## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

