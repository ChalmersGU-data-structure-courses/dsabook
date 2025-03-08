.PHONY: all default clean preprocess pandoc postprocess install deploy check-links server

# Directories
SRC       := src
LIB       := lib
RSC       := resources
MARKOWN   := $(SRC)/markdown
TEMP      := _temp
BUILD     := build
HTML      := $(BUILD)/html
DOCS      := docs

# Source Files
GLOSSARY  := $(MARKOWN)/X-appendix/01-glossary.md
MD_FILES  := $(wildcard $(MARKOWN)/*/*.md)

# Tools
PYTHON    := python3
PANDOC    := pandoc
HYPERLINK := hyperlink

default: install

all: install check-links

clean:
	@echo "Cleaning..."
	@rm -rf $(TEMP) $(BUILD)

preprocess: clean
	@mkdir -p $(TEMP)
	@echo "Preprocessing..."
	@time $(PYTHON) extra/preprocess.py $(TEMP) $(GLOSSARY) $(MD_FILES)

pandoc: preprocess
	@mkdir -p $(BUILD)
	@echo "Running pandoc..."
	@time $(PANDOC) --defaults=pandoc-defaults.yaml --resource-path=resources --output=$(HTML) $(TEMP)/*.md
	@rm -fr $(TEMP)

postprocess: pandoc
	@echo "Postprocessing..."
	@time $(PYTHON) extra/postprocess.py $(HTML)/*.html

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
	$(HYPERLINK) dump-external-links --base-path $(HTML) | sort | uniq
	@echo "--------------"
	$(HYPERLINK) --check-anchors $(HTML)

server:
	$(PYTHON) -m http.server -d $(BUILD) 8000
