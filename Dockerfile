FROM php:8.3.18RC1-fpm-alpine

WORKDIR /app

RUN apk update && apk upgrade && \
    apk add --no-cache \
    nodejs \
    npm \
    git \
    curl

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install MongoDB extension
RUN apk add --no-cache $PHPIZE_DEPS openssl-dev \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb
    
USER dev

# Change CMD to use an entrypoint script
CMD ["sh", "./docker-entrypoint.sh"]