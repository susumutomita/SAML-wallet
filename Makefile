.PHONY: install
install:
	npm install

.PHONY: test
test:
	npm run test

.PHONY: lint
lint:
	npx eslint . --ext .ts,.tsx

.PHONY: lint_text
lint_text:
	npx textlint ./README.md

.PHONY: format
format:
	npx prettier --write .

.PHONY: run
run:
	npm start

.PHONY: build
build:
	npm run build

.PHONY: before_commit
before_commit: test lint format
