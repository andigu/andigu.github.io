To deploy: `git subtree push --prefix dist origin gh-pages`

Locally develop by running `make all` in the root and `python3 -m http.server` in the build folder.

For live recompilation, we can use (taking my notes on geometric algebra as an example) `ls src/notes/geometric.md | entr -s 'make src/notes/geometric.html'`.