const slide = (id) => 
`
<section class="title left" id=${id}>
    <div class="grid-wrapper"  data-delay=".1" data-animate="fadeIn">
        <div class="header">
            <div class="logo logo--full"></div>
        </div>
        <div class="content">
            <h1>Introduction to the topic</h1>
            <div class="description">
                This is where the description goes. Keep it short and sweet.
            </div>
        </div>
        <div class="credit">
            <hr/>
            <div class="label">Presented By</div>
            <div class="name">Full Name</div>
            <div class="role">Role</div>
        </div>
    </div>
</section>
`;

export default slide;