# xadrezmaroto

## Instanciar o projeto
docker-compose up -d --build (--build só na primeira vez)

## Comandos no backend (Laravel)
docker-compose exec xadrezmaroto-back php artisan migrate
docker-compose exec xadrezmaroto-back php artisan make:controller MeuController

## Parar o projeto
docker-compose down

## Logs
docker-compose logs -f laravel-app
docker-compose logs -f react-app