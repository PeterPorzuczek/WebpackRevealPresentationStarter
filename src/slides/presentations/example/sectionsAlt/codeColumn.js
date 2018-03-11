import code from './code';
import codeFigure from '../../../components/codeFigure';

const codeCol = (animParams) => 
`
<div class="column" ${animParams}>
    <h1>Test code</h1>
    ${codeFigure(code.content(), code.caption(), code.lang(), 'line-numbers', 'bigger')}
</div>
`;

export default codeCol;