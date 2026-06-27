.PHONY: all default clean preprocess pandoc postprocess install deploy check-links server

# Default is to build all chapters
# Run `make CHAPTER=02` to only build chapter 2
CHAPTER :=

# Directories
SRC       := src
LIB       := lib
RESOURCES := resources
IMGDIR    := $(RESOURCES)/images
MARKDOWN  := $(SRC)/markdown
TEMP      := _temp
BUILD     := build
HTML      := $(BUILD)/html
DOCS      := docs
GENERATED := rendered-images plots

# Source Files
GLOSSARY  := $(MARKDOWN)/X-appendix/03-glossary.md
MD_FILES  := $(sort $(wildcard $(MARKDOWN)/$(CHAPTER)*/*.md) $(wildcard $(MARKDOWN)/*/00-*.md) $(wildcard $(MARKDOWN)/*.md))

# Auto-generated images
SRC_IMAGES := $(wildcard $(IMGDIR)/*.py)
GEN_IMAGES := $(SRC_IMAGES:%.py=%.svg)

# Tools
PYTHON    := python3
PANDOC    := pandoc --resource-path=$(RESOURCES) --data-dir=pandoc --defaults=dsabook.yaml
HTMLTEST  := htmltest

help:
	@echo "make all = install + check-links"
	@echo "make deploy = install + deploy to 'docs' directory"
	@echo "make check-links = check that no HTML links are dead"
	@echo "make install = postprocess + install in 'build' directory"
	@echo "make postprocess = pandoc + postprocess the generated HTML files"
	@echo "make pandoc = preprocess + run Pandoc (generate HTML from Markdown)"
	@echo "make preprocess = render + preprocess Markdown files"
	@echo "make render = generate images"
	@echo "make server = run local HTTP server on http://localhost:8000/"
	@echo "make clean = remove temporary files and rendered images"


all: install check-links

clean:
	@echo
	@echo "# Cleaning..."
	@rm -rf $(TEMP) $(BUILD) $(GENERATED) $(GEN_IMAGES)

$(IMGDIR)/%.svg: $(IMGDIR)/%.py
	python $<

render: $(GEN_IMAGES)

preprocess: render
	@rm -rf $(TEMP)
	@mkdir -p $(TEMP)
	@echo
	@echo "# Preprocessing..."
	@time $(PYTHON) scripts/preprocess.py $(TEMP) $(GLOSSARY) $(MD_FILES)

pandoc: preprocess
	@rm -rf $(BUILD)
	@mkdir -p $(BUILD)
	@echo
	@echo "# Running pandoc..."
	@time $(PANDOC) --output=$(HTML) $(TEMP)/*.md
	@rm -fr $(TEMP)

postprocess: pandoc
	@echo
	@echo "# Postprocessing..."
	@time $(PYTHON) scripts/postprocess.py $(HTML)/*.html

install: postprocess
	@echo
	@echo "# Installing..."
	@cp    $(SRC)/index.html     $(BUILD)/ || true
	@cp -r $(SRC)/interactive    $(BUILD)/ || true
	@cp -r $(SRC)/khan-exercises $(BUILD)/ || true
	@cp -r $(RESOURCES)/*        $(BUILD)/ || true
	@cp -r $(LIB)                $(BUILD)/ || true

deploy: install
	@echo
	@echo "# Deploying..."
	@rm -fr $(DOCS)
	@cp -r $(BUILD) $(DOCS) || true

check-links:
	$(HTMLTEST) $(HTML)

server:
	$(PYTHON) -m http.server -d $(BUILD) 8000
