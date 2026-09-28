# geoshapez

A minimal, monochrome geometry editor with 173 mathematical forms, grouped variations, adjustable parameters, manual 3D rotation, and SVG export.

## Run locally

No build step or dependencies are required. With Python 3 installed, run this command from the repository root:

```sh
python3 -m http.server 4173
```

Open http://localhost:4173 in your browser.

## Files

- `index.html` — editor interface
- `style.css` — responsive styles
- `app.js` — editor controls and SVG export
- `engine.js` — geometry rendering and projection
- `shapes.js` and `variations.js` — shape library

The repository is ready for GitHub Pages: deploy from the root of the default branch.
