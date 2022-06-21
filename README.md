To deploy: `git subtree push --prefix build origin gh-pages`

Locally develop by running `make all` in the root and `python3 -m http.server` in the build folder.

For live recompilation, we can use (taking my notes on geometric algebra as an example) `ls src/notes/geometric.md | entr -s 'make src/notes/geometric.html'`.

The strange looking `build/output` folder contains fonts necessary to make MathJax work in `--self-contained` mode. 