#!/bin/bash

CERT_DIR="./cert"
mkdir -p $CERT_DIR
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout $CERT_DIR/server.key \
    -out $CERT_DIR/server.crt \
    -subj "/C=JP/ST=Kanagawa/L=Yokohama/O=TEST/OU=DEV/CN=test.com"

echo "SSL certificate and key generated in $CERT_DIR"
