
DOCCO ?= `which docco`
WATCHR ?= `which watchr`

site:
	node aux/buildSite.js

test:
	expresso test/*.test.js

docs:
	@@if test ! -z ${DOCCO}; then \
		docco app.js; \
		docco lib/*.js; \
	else \
		echo "You must have docco installed in order to build the documentation."; \
		echo "You can install it by running: npm install docco -g"; \
	fi

watch:
	@@if test ! -z ${WATCHR}; then \
	  echo "Watching lib and test folders..."; \
	  watchr aux/watching.rb; \
	else \
		echo "You must have the watchr installed in order to watch Full Meta Jacket."; \
		echo "You can install it by running: gem install watchr"; \
	fi

all: test docs

.PHONY: test docs watch
