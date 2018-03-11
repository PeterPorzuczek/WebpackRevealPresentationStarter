const content = () => 
`@font-face {
	font-family: Chunkfive;
	src: url('Chunkfive.otf');
}

body,
.usertext {
	color: #F0F0F0;
	background: #600;
	font-family: Chunkfive, sans;
}

@import url(print.css);
@media print {
	a[href^=http]::after {
		content: attr(href)
	}
}
`;

const caption = () => 
`/src/styles/some.css`;

const lang = () => 
`lang-css`;

const code = { content, caption, lang };

export default code;