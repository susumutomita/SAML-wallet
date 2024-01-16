.PHONY: install
install:
	npm install

.PHONY: test
test:
	npm run test

.PHONY: lint
lint:
	npx eslint . --ext .ts,.tsx

.PHONY: format
format:
	npx prettier --write .

.PHONY: before_commit
before_commit: test lint format

.PHONY: run
run:
	npm start

.PHONY: build
build:
	npm run build
