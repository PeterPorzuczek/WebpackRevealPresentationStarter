Webpack based Reveal.js presentation template with use of theme from MyPlanet https://github.com/gapple/myplanet-revealjs

The goal here was to make nice modular slide presentation starter. So how to bite it - just make folder for your presentation in src/slides/presentations/ then make someting like in src/slides/presentations/example and change path to presentation in src/slides/index.js. Theme is placed in src/lib/assets/styles/modern.css (Enabling scrolling was intentional just because I think it's big advantage of html presentations). Build was prepared to be very compact in terms of files amount (font-awesome makes size much bigger).

```
npm install
# then 
npm start
# build 
npm run-script build
```