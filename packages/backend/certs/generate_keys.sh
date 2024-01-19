#!/bin/bash

# Generate the private key
openssl genpkey -algorithm RSA -out saml_sp.key

# Generate the public key
openssl rsa -pubout -in saml_sp.key -out saml_sp.crt

echo "Keys generated successfully."
