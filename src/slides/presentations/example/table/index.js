import tableContent from './tableContent';

const slide = (id) => 
`
<section class="row" id=${id}>
    <div class="grid-wrapper">
        <div class="header">
            <div class="logo"></div>
            <div class="section">Section</div>
        </div>
        <div class="content table" style="grid-template-rows: 5% auto;">
            <h1>Table</h1>
            <div data-animate="slideInUp">${tableContent()}</div>
        </div>
    </div>
</section>
`;

export default slide;