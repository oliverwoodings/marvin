BIN = ./node_modules/.bin

.PHONY: start lint test deploy bootstrap

start:
	NODE_ENV=development $(BIN)/nodemon .

lint:
	$(BIN)/standard

test: lint

build:
	NODE_ENV=production $(BIN)/webpack -p --progress

deploy:
	$(BIN)/pm2 deploy production

bootstrap:
	yarn

bundle-skills:
	(cd ./app/skills && zip -r ../../skills.zip ./*)
