<!-- textlint-disable ja-technical-writing/sentence-length -->

[![CI](https://github.com/susumutomita/SAML-wallet/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/susumutomita/SAML-wallet/actions/workflows/ci.yml)
![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/susumutomita/SAML-wallet)
![GitHub top language](https://img.shields.io/github/languages/top/susumutomita/SAML-wallet)
![GitHub pull requests](https://img.shields.io/github/issues-pr/susumutomita/SAML-wallet)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/susumutomita/SAML-wallet)
![GitHub repo size](https://img.shields.io/github/repo-size/susumutomita/SAML-wallet)
[![Tryvy](https://github.com/susumutomita/SAML-wallet/actions/workflows/tryvy.yml/badge.svg?branch=main)](https://github.com/susumutomita/SAML-wallet/actions/workflows/tryvy.yml)
[![FOSSA Status](https://app.fossa.com/api/projects/custom%2B37708%2Fgithub.com%2Fsusumutomita%2FSAML-wallet.svg?type=shield&issueType=license)](https://app.fossa.com/projects/custom%2B37708%2Fgithub.com%2Fsusumutomita%2FSAML-wallet?ref=badge_shield&issueType=license)

# SAML-Wallet: SAML Token-Based Wallet Integration

SAML-Wallet is an enterprise-level project that integrates SAML token-based authentication with Web3 technologies, providing secure and efficient digital wallet solutions.

## Prerequisites

- Docker and Docker Compose must be installed on your system.
- Familiarity with Docker and basic understanding of SAML (Security Assertion Markup Language) and Web3 technologies.

## Project Setup

### Environment Setup

1. Clone the repository and navigate to the project directory.
2. Copy the `.env_sample` to `.env` and populate it with your specific configurations. Use the following placeholders for the required variables:

   ```plaintext
   MYSQL_ROOT_PASSWORD=<your_mysql_root_password>
   MYSQL_DATABASE=keycloak
   MYSQL_USER=keycloak
   MYSQL_PASSWORD=<your_mysql_password>
   KEYCLOAK_ADMIN=<your_keycloak_admin_username>
   KEYCLOAK_ADMIN_PASSWORD=<your_keycloak_admin_password>
   ```

3. Ensure Docker is running on your machine.

### Running the Identity Provider (IDP)

Run the following command to start Keycloak and MySQL:

```bash
docker-compose up -d
```

This will initialize and run the necessary services in detached mode.

### Accessing Keycloak

- Keycloak will be available at `http://localhost:8080`.
- Log in using the admin credentials provided in your `.env` file.

### Configuring Keycloak

- Set up realms, clients (SAML and OpenID Connect), users, and roles.
- Configure SAML client according to your application's SAML callback URLs and entity IDs.

## Development Notes

- The `.env` file should never be committed to version control.
- Use `docker logs` for troubleshooting container issues.
- Check out the Keycloak documentation for advanced configuration options.

## Security and Production Readiness

- Utilize HTTPS in production to secure communication.
- Regularly update passwords and check for security patches.
- Apply network security best practices, including firewall rules and restricted access to sensitive endpoints.

## Backup and Data Retention

- Implement a backup strategy for your MySQL database and Keycloak configuration.
- Test recovery procedures to ensure that data restoration is reliable.

## Contribution

- Contributions are welcome! Please read our contributing guidelines and code of conduct before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
