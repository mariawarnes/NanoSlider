# NanoSlider

## Installation:
- Click the green `Code` button
- Click `Download ZIP`
- Copy either the minified files in the `/dist` folder or the `nanoslider.css` and `nanoslider.js` in the root of the folder you're working in
- In the `<head>` of your html page add the following: `<link rel="stylesheet" href="nanoslider{.min}.css"/>`
- Just before the closing `</body>` tag of your html page add the following: `<script src="nanoslider{.min}.js"></script>`
- Recommended HTML structure:
```
<div class="carousel-wrap">
  <div class="carousel">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>
  <button class="prev-button" aria-label="Previous Item">Prev</button>
  <button class="next-button" aria-label="Next Item">Next</button>
</div>
```

Example: https://codepen.io/mariawarnes/pen/ExdobEJ
