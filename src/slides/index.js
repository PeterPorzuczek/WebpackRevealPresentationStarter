import $ from 'jquery';

import slides from './presentations/example';

slides.forEach(slide => { $('#slides').append(slide); });

$('#app').addClass('pattern--06');