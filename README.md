Locally develop by running `make all` and then `python3 -m http.server`.

For live recompilation, we can use (taking my notes on geometric algebra as an example) `ls notes/geometric.md | entr -s 'make notes/geometric.html'`, and `sass -w index.scss index.css`

