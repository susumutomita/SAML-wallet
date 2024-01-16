.PHONY: install
install:
	npm install

.PHONY: celarn
lint:
	npm run clean

.PHONY: test
test:
	npm run test

.PHONY: test_coverage
test_coverage:
	npm run test:coverage

.PHONY: test_debug
test_debug:
	npm run test:debug

.PHONY: test_watch
test_watch:
	npm run test:watch

.PHONY: lint
lint:
	npm run lint

.PHONY: textlint
textlint:
	npm run textlint

.PHONY: format
format:
	npm run format

.PHONY: before_commit
before_commit: test format lint

.PHONY: run
run:
	npm run start
