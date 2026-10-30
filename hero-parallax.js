/* Parallax uses a separate layer so the entrance keeps control of photo scale. */
(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const frame = document.querySelector('.hero-photo-reveal');
  const depth = frame?.querySelector('.hero-photo-depth');
  if (!depth) return;
  const media = gsap.matchMedia();
  media.add('(min-width: 992px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', context => {
    gsap.set(depth, { scale: 1.06 });
    let started = false;
    context.add('startParallax', () => {
      if (started) return;
      started = true;
      gsap.fromTo(depth, { yPercent: 0 }, {
        yPercent: 2.5, ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top top', end: 'bottom top', scrub: .6, invalidateOnRefresh: true }
      });
    });
    const start = () => context.startParallax();
    frame.addEventListener('hero-intro-complete', start);
    if (frame.dataset.introComplete === 'true') start();
    return () => frame.removeEventListener('hero-intro-complete', start);
  });
})();
