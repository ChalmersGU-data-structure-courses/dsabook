.PHONY: all default clean preprocess pandoc postprocess deploy check-links

# Directories
TEMP       := _temp
TEMP_SRC   := $(TEMP)/src
TEMP_HTML  := $(TEMP)/html
DOCS_HTML  := docs/html

# Source Files
GLOSSARY   := src/X-appendix/01-glossary.md
SRC_FILES  := $(wildcard src/*/*.md)

# Tools
PYTHON     := python3
PANDOC     := pandoc
HYPERLINK  := hyperlink

default: clean preprocess pandoc postprocess deploy

all: clean preprocess pandoc postprocess deploy check-links

clean:
	@rm -rf $(TEMP) $(DOCS_HTML)/*

preprocess:
	@mkdir -p $(TEMP_SRC)
	@echo "Preprocessing: src/*/* -> $(TEMP_SRC)"
	@time $(PYTHON) extra/preprocess.py $(TEMP_SRC) $(GLOSSARY) $(SRC_FILES)

pandoc:
	@echo "Running pandoc: $(TEMP_SRC)/* -> $(TEMP_HTML)/*"
	@time $(PANDOC) --defaults=pandoc-defaults.yaml --output=$(TEMP_HTML) $(TEMP_SRC)/*.md

postprocess:
	@echo "Postprocessing: $(TEMP_HTML)/* -> $(DOCS_HTML)/*"
	@time $(PYTHON) extra/postprocess.py $(DOCS_HTML) $(TEMP_HTML)/*.html

deploy:
	@cp -Rn $(TEMP_HTML)/ $(DOCS_HTML) || true

check-links:
	$(HYPERLINK) dump-external-links --base-path $(DOCS_HTML) | sort | uniq
	@echo "--------------"
	$(HYPERLINK) --check-anchors $(DOCS_HTML)
