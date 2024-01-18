# SAML Authentication Example with Express

This project demonstrates how to implement SAML authentication in an Express application using the `passport-saml` library. It integrates with a SAML Identity Provider (IdP) for user authentication.

## Environment Variables

The application relies on the following environment variables for configuration and SAML authentication parameters:

- `PORT`: The port number on which the application listens. Default is `3000`.
- `CALLBACK_BASE_URL`: The base part of the callback URL for SAML responses. For example, `http://localhost:3000/`.
- `SAML_SP_KEY`: The private key for the SAML Service Provider. Used for decrypting SAML responses.
- `SAML_ENTRY_POINT`: The entry point URL of the SAML IdP. This is where users will be redirected to start authentication.
- `SAML_IDP_CERT`: The public certificate of the SAML IdP. Used for verifying SAML responses.

## Setup

1. Install the necessary dependencies:

   ```bash
   npm install
   ```

2. Set up your environment variables. Create a `.env` file and define the above variables.

3. Start the application:

   ```bash
   npm start
   ```

## Usage

After starting the application, use a browser to access the URL hosted on the specified port. The SAML authentication flow can be initiated at the `/saml/login` route.
