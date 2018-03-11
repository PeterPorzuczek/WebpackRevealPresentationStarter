import list from './biglist';

const slide = (id) => 
`
<section class="subsection color--white" id=${id}>
    <div class="grid-wrapper grid-wrapper--s0">
        <div class="logo"></div>
        <h1 data-animate="slideInDown">List</h1>
        <div class="description space" data-animate="slideInLeft">
            This is where the description goes. Keep it short and sweet.
            <div class="points">${list()}</div>
        </div>
    </div>
</section>
`;

export default slide;