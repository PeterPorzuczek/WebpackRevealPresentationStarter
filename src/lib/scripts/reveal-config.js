import { RevealMarkdown } from 'reveal.js/plugin/markdown/markdown';

document.addEventListener('DOMContentLoaded', (event) => {
    window.Reveal = Reveal; // plugins need that

    Reveal.initialize({
        center: false,
        width: "100%",
        height: "100%",
        margin: 0,
        minScale: 1,
        maxScale: 1,
        history: true,        
        slideNumber: true,
    });

    RevealMarkdown.initialize();

    hljs.initHighlightingOnLoad();
});