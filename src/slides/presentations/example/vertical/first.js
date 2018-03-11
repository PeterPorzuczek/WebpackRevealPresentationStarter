const slide = (id) => 
`
<section class="subsection color--green" id=${id}>
    <div class="grid-wrapper grid-wrapper--s1">
        <div class="logo"></div>
        <h1 data-animate="fadeInDown">First vertical slide</h1>
        <div data-delay=".1" data-animate="fadeInDown" class="description space">
            First vertical slide content.
        </div>
    </div>
</section>
`;

export default slide;