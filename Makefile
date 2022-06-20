SOURCE_DOCS = $(shell find src -type f -name '*.md')

EXPORTED_DOCS=\
 $(SOURCE_DOCS:.md=.html) \
 $(SOURCE_DOCS:.md=.pdf) \

PANDOC=/usr/local/bin/pandoc
PANDOC_OPTIONS=--standalone -N --toc --filter pandoc-xnos --citeproc --bibliography=./src/papers.bib ./src/default.yml
PANDOC_HTML_OPTIONS=--css /index.css --mathjax --to html5 --filter pandoc-sidenote --template ./template.html
PANDOC_PDF_OPTIONS=
RM=/bin/rm

.PHONY: all

%.html : %.md
	$(PANDOC) $(PANDOC_OPTIONS) $(PANDOC_HTML_OPTIONS) -o $(subst src,build,$@) $< \

%.pdf : %.md
	$(PANDOC) $(PANDOC_OPTIONS) $(PANDOC_PDF_OPTIONS) -o $(subst src,build,$@) $<

all : $(EXPORTED_DOCS)
	$(shell cp src/index.css build)

