[![CI](https://github.com/susumutomita/SAML-wallet/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/susumutomita/SAML-wallet/actions/workflows/ci.yml)

# SAML-Wallet Project Setup Guide

This README explains how to set up the Identity Provider (IDP) Keycloak and other services for the SAML-Wallet project using Docker.

## Prerequisites

- Docker and Docker Compose are installed.
- Basic knowledge of Docker.

## Setup Instructions

### 1. Create Environment Variable File

- Copy the `.env_sample` file and create a `.env` file in the project directory.
- Update environment variables in the `.env` file, such as passwords (e.g., MYSQL_ROOT_PASSWORD, KEYCLOAK_ADMIN_PASSWORD), to appropriate values.

### 2. Run IDP

- In the root directory of the project, execute the following command to start the Keycloak IDP and MySQL database:

```bash
docker-compose up -d
```

- This command uses Docker Compose to launch the services (MySQL and Keycloak) defined in the `docker-compose.yml` file in the background.

### 3. Access Keycloak

- By default, Keycloak starts on port 8080.
- Access the Keycloak admin console via `http://localhost:8080` in your browser.
- Use the admin username (KEYCLOAK_ADMIN) and password (KEYCLOAK_ADMIN_PASSWORD) set in your `.env` file for login.

### 4. Configure Keycloak

- In the Keycloak admin console, configure clients, roles, users, etc.
- Set up as an Identity Provider based on the SAML protocol.

## Notes

- The `.env` file contains sensitive information, so be careful not to include it in your Git repository.
- If there are any issues with the Docker containers, check the logs using `docker logs [container_name]`.
- For detailed information on configuring and managing Keycloak, refer to the official Keycloak documentation.

### 5. Security Considerations

- In a production environment, ensure to use strong passwords for databases and admin accounts.
- Consider using SSL for encrypting communications between Keycloak and MySQL for enhanced security.
- Before deploying to production, verify firewall settings and access controls as part of your security measures.

### 6. Backup and Recovery

- Regularly backing up the database is recommended.
- Plan for backup of Keycloak configurations and data for emergency recovery.
