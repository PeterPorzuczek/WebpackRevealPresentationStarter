import intro from './intro';
import start from './start';
import vertical from './vertical';
import list from './list';
import table from './table';
import sections from './sections';
import team from './team';
import sectionsAlt from './sectionsAlt';
import end from './end';

let slides = [];

slides.push(intro('intro'));
slides.push(start('start'));
slides.push(vertical('vertical'));
slides.push(list('list'));
slides.push(table('table'));
slides.push(sections('sections'));
slides.push(team('team'));
slides.push(sectionsAlt('sections-alt'));
slides.push(end('end'));

export default slides;