SOURCE_DOCS = $(shell find . -type f -name '*.md' -not -name 'README.md')

EXPORTED_DOCS=\
 $(SOURCE_DOCS:.md=.html) \
 $(SOURCE_DOCS:.md=.pdf) \

PANDOC=/usr/local/bin/pandoc
PANDOC_OPTIONS=--standalone -N --toc default.yml  --lua-filter filters/statement.lua --lua-filter filters/diagram-generator.lua --lua-filter=list-table.lua --filter pandoc-crossref --citeproc --bibliography=papers.bib  --extract-media=static/img/generated
PANDOC_HTML_OPTIONS=--css /static/css/index.css --mathjax --to html5 --filter pandoc-sidenote --template template.html --lua-filter filters/paths.lua
PANDOC_PDF_OPTIONS=
RM=/bin/rm

.PHONY: all clean

.EXPORT_ALL_VARIABLES:
MATPLOTLIBRC = ./.matplotlibrc

%.html : %.md
	$(PANDOC) $(PANDOC_OPTIONS) $(PANDOC_HTML_OPTIONS) -o $@ $< \

%.pdf : %.md
	$(PANDOC) $(PANDOC_OPTIONS) $(PANDOC_PDF_OPTIONS) -o $@ $<

all : $(EXPORTED_DOCS)
	- $(shell sass static/css/index.scss static/css/index.css)
	- $(shell find . -type f -name '*index.pdf' -delete)

clean:
	rm -f static/img/generated/*



