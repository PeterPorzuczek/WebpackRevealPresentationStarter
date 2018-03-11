const numbers = [...Array(10).keys()];
const numbersRender = () => numbers.map((x) => `<li>${x}</li>`);

const list = () => 
`
<ul>
 ${numbersRender().join('')}
</ul>
`;

export default list;