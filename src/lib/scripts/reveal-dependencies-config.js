import about from '../../slides/about';

Reveal.configure({
    menu: {
        side: 'left',
        numbers: true,
        titleSelector: 'h1, h2, h3, h4, h5, h6',
        hideMissingTitles: false,
        markers: true,
        custom: [
            { title: 'About', icon: '<i class="fa fa-info">', content: `${about()}` }
        ],
        themes: false,
        transitions: false,
        openButton: true,
        openSlideNumber: false,
        keyboard: true,
        loadIcons: false
    }
});