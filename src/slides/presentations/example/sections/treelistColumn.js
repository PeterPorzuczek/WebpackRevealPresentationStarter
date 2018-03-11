import treelist from './treelist';

const treelistCol = (animParams) => 
`
<div class="column" ${animParams}>
    <h1>Tree list</h1>
    <div>
        ${treelist()}
    </div>
</div>
`;

export default treelistCol;