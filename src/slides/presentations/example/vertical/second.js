const slide = (id) => 
`
<section class="subsection color--violet" id=${id}>
    <div class="grid-wrapper grid-wrapper--s2">
        <div class="logo"></div>
        <h1 data-animate="fadeInRight">Second vertical slide</h1>
        <div data-delay=".1" data-animate="fadeInRight" class="description space">
            Second vertical slide content.
        </div>
    </div>
</section>
`;

export default slide;