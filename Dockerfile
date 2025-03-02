FROM php:8.3.18RC1-fpm-alpine

WORKDIR /app

# Add non-root user
RUN addgroup -g 1000 appuser && \
    adduser -u 1000 -G appuser -s /bin/sh -D appuser

RUN apk update && apk upgrade && \
    apk add --no-cache \
    nodejs \
    npm \
    git \
    curl

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN apk add --no-cache $PHPIZE_DEPS postgresql-dev \
    && docker-php-ext-install pdo pdo_pgsql \
    && docker-php-ext-install pcntl

# Set ownership
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Change CMD to use an entrypoint script  
CMD ["sh", "./docker-entrypoint.sh"]