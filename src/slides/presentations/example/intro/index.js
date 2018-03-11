const slide = (id) => 
`
<section class="intro" id=${id} data-transition-speed="fast">
  <div class="logo-wrapper">
    <div class="logo" data-delay=".1" data-animate="fadeInLeft">
      <h1 class="visually-hidden">Example<h1>
    </div>
  </div>
  <aside class="notes">
    Don't forget to introduce yourself.
  </aside>
</section>
`;

export default slide;