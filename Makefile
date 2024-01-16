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

.PHONY: format_check
format_check:
	npx prettier --check .

.PHONY: run
run:
	npm start

.PHONY: build
build:
	npm run build

.PHONY: before_commit
before_commit: format_check lint lint_text test
