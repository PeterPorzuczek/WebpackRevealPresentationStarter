const slide = (id) => 
`
<section class="subsection color--blue" id=${id}>
    <div class="grid-wrapper grid-wrapper--s0">
        <div class="logo"></div>
        <h2 data-animate="fadeInLeft">Vertical Slides Main</h2>
        <div class="description space">
            <p data-delay=".1" data-animate="fadeInLeft">Slides can be nested inside of each other.</p>
            <p data-delay=".2" data-animate="fadeInLeft">Use the <em>Space</em> key to navigate through all slides.</p>
        </div>
    </div>
</section>
`;

export default slide;