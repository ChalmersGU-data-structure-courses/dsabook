.PHONY: all default clean preprocess pandoc postprocess install deploy check-links server pdf

# Default is to build all chapters
# Run `make CHAPTER=02` to only build chapter 2
CHAPTER :=

# Directories
SRC       := src
LIB       := lib
RSC       := resources
MARKDOWN  := $(SRC)/markdown
TEMP      := _temp
BUILD     := build
HTML      := $(BUILD)/html
PDF       := book.pdf
BOOK      := dsabook.pdf
DOCS      := docs

# Source Files
GLOSSARY  := $(MARKDOWN)/X-appendix/01-glossary.md
MD_FILES  := $(sort $(wildcard $(MARKDOWN)/$(CHAPTER)*/*.md) $(wildcard $(MARKDOWN)/*/00-*.md) $(wildcard $(MARKDOWN)/*.md))

# Tools
PYTHON    := python3
PANDOC    := pandoc --resource-path=$(RSC) --data-dir=pandoc --defaults=dsabook.yaml
HTMLTEST  := htmltest

default: install

all: install check-links

clean:
	@echo "Cleaning..."
	@rm -rf $(TEMP) $(BUILD)

preprocess: clean
	@mkdir -p $(TEMP)
	@echo "Preprocessing..."
	@time $(PYTHON) scripts/preprocess.py $(TEMP) $(GLOSSARY) $(MD_FILES)

pandoc: preprocess
	@mkdir -p $(BUILD)
	@echo "Running pandoc..."
	@time $(PANDOC) --defaults=dsabook-html.yaml --output=$(HTML) $(TEMP)/*.md
	@rm -fr $(TEMP)

postprocess: pandoc
	@echo "Postprocessing..."
	@time $(PYTHON) scripts/postprocess.py $(HTML)/*.html

install: postprocess
	@echo "Installing..."
	@cp    $(SRC)/index.html     $(BUILD)/ || true
	@cp -r $(SRC)/interactive    $(BUILD)/ || true
	@cp -r $(SRC)/khan-exercises $(BUILD)/ || true
	@cp -r $(RSC)/*              $(BUILD)/ || true
	@cp -r $(LIB)                $(BUILD)/ || true

deploy: install
	@echo "Deploying..."
	@rm -fr $(DOCS)
	@cp -r $(BUILD) $(DOCS) || true

check-links:
	$(HTMLTEST) $(HTML)

server:
	$(PYTHON) -m http.server -d $(BUILD) 8000

pdf:
	@echo "Running pandoc + XeTeX --> $(PDF)..."
	@time $(PANDOC) --defaults=dsabook-latex.yaml --output=$(PDF) $(MD_FILES)

latex:
	@echo "Running pandoc --> $(BOOK:.pdf=.tex)..."
	@time $(PANDOC) --defaults=dsabook-studentlitteratur.yaml --to=latex --output=$(BOOK:.pdf=.tex) $(MD_FILES)

book:
	@echo "Running pandoc + pdfLaTeX --> $(BOOK)..."
	@time $(PANDOC) --defaults=dsabook-studentlitteratur.yaml --output=$(BOOK) $(MD_FILES)
