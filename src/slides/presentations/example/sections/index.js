import codeCol from './codeColumn';
import notesCol from './notesColumn';
import treelistCol from './treelistColumn';

const slide = (id) => 
`
<section class="color--green row" id=${id} >
	<div class="grid-wrapper">
		<div class="header">
			<div class="logo"></div>
			<div class="section">Section</div>
		</div>

        <div class="content custom--three">
        ${treelistCol('data-animate="fadeInLeft"')}
        ${codeCol('data-delay=".1" data-animate="fadeInDown"')}
        ${notesCol('data-delay=".2" data-animate="fadeInRight"')}
		</div>
	</div>
</section>
`;

export default slide;