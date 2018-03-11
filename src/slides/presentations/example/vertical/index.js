import main from './main';
import second from './second';
import first from './first';

const slide = (id) => 
`
<section style="overflow:hidden !important;">
    ${main(id)}
    ${first(id + '_first')}
    ${second(id + '_second')}
</section>
`;

export default slide;