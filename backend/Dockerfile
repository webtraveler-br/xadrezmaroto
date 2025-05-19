FROM php:8.2-cli

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

ARG USER_ID
ARG GROUP_ID

RUN if [ -z "$USER_ID" ] || [ -z "$GROUP_ID" ]; then \
        echo "USER_ID e GROUP_ID não definidos, usando padrão 33:33 (www-data em algumas distribuições)" ; \
        USER_ID=33 ; \
        GROUP_ID=33 ; \
    fi && \
    addgroup --gid $GROUP_ID laravel_user && \
    adduser --uid $USER_ID --gid $GROUP_ID --disabled-password --gecos "" laravel_user

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN pecl install xdebug && docker-php-ext-enable xdebug
COPY --chown=laravel_user:laravel_user ./docker/php/conf.d/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

WORKDIR /var/www/html

COPY --chown=laravel_user:laravel_user composer.json composer.lock ./

USER laravel_user
RUN composer install --prefer-dist --no-scripts --no-autoloader

COPY --chown=laravel_user:laravel_user . .

RUN composer dump-autoload --optimize \
    && composer run-script post-root-package-install \
    && composer run-script post-create-project-cmd

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]