.PHONY: front-shell back-shell build up down logs-front logs-back

build: ## Constrói as imagens Docker
	docker-compose up -d --build

up: ## Inicia os contêineres em background
	docker-compose up -d

down: ## Para e remove os contêineres, redes
	docker-compose down

front-shell: ## Acessa o shell do contêiner frontend
	docker-compose exec -it xadrezmaroto-front /bin/sh

back-shell: ## Acessa o shell do contêiner backend
	docker-compose exec -it xadrezmaroto-back /bin/sh

front-logs: ## Mostra os logs do frontend
	docker-compose logs -f xadrezmaroto-front

back-logs: ## Mostra os logs do backend
	docker-compose logs -f xadrezmaroto-back

help: ## Mostra esta ajuda
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
