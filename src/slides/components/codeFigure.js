

const codeContainter = (code, caption, langaugeMarkdown, otherClasses, classes) => 
`
<figure class="code ${classes}">
    <pre><code class="${langaugeMarkdown} ${otherClasses}">${code}</code></pre>
    <figcaption class="path">${caption}</figcaption>
</figure>
`;

export default codeContainter;