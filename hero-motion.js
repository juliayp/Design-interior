/* Hero: desktop mask reveal, responsive scroll reveal, shared title entrance. */
(() => {
  if (!window.gsap) return;
  const hero = document.querySelector('.section-hero');
  const title = hero?.querySelector('.h1-text-main');
  const frame = hero?.querySelector('.hero-photo-reveal');
  const photo = frame?.querySelector('.img-main');
  const badge = hero?.querySelector('.text-block');
  if (!title || !frame || !photo || !badge) return;
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.timeline({ defaults: { ease: 'power2.out' } })
      .fromTo(title, { opacity: 0, scale: .88, transformOrigin: 'left center' }, { opacity: 1, scale: 1, duration: 1.3, ease: 'power2.inOut' }, .22)
      .fromTo(badge, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .6 }, .16);
  });
  media.add('(min-width: 992px) and (prefers-reduced-motion: no-preference)', () => {
    gsap.timeline({ onComplete: () => {
      frame.dataset.introComplete = 'true';
      frame.dispatchEvent(new Event('hero-intro-complete'));
    } })
      .fromTo(frame, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.3, ease: 'power3.inOut' }, .22)
      .fromTo(photo, { scale: 1.06 }, { scale: 1, duration: 1.5, ease: 'power2.out' }, .22);
    return () => { delete frame.dataset.introComplete; };
  });
  if (!window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  media.add('(max-width: 991px) and (prefers-reduced-motion: no-preference)', () => {
    const animation = gsap.fromTo(frame, { opacity: 0, y: 28 }, {
      opacity: 1, y: 0, duration: .85, ease: 'power2.out',
      scrollTrigger: { trigger: frame, start: 'top 90%', end: 'bottom top', toggleActions: 'restart none restart none' }
    });
    ScrollTrigger.create({
      trigger: frame, start: 'top bottom', end: 'bottom top',
      onLeave: () => animation.pause(0),
      onLeaveBack: () => animation.pause(0)
    });
  });
})();
