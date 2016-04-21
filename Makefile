BIN = ./node_modules/.bin

.PHONY: start lint test

start:
	@NODE_ENV=development $(BIN)/nodemon .

lint:
	@$(BIN)/standard

test: lint

build:
	@NODE_ENV=production $(BIN)/webpack -p --progress