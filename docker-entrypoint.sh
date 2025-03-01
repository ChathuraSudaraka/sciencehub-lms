#!/bin/sh
set -e

# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install

# Start the application
composer run dev