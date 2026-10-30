/* Project cards: independent viewport triggers preserve the staggered mosaic. */
(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const cards = gsap.utils.toArray('#Reviews .link-progect');
  if (!cards.length) return;
  const media = gsap.matchMedia();
  media.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
    if (context.conditions.reduce) return;
    cards.forEach(card => {
      const siblings = Array.from(card.parentElement.children);
      const animation = gsap.fromTo(card, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: .85,
        delay: context.conditions.desktop ? siblings.indexOf(card) * .13 : 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card, start: 'top 90%', end: 'bottom top',
          toggleActions: 'restart none restart none'
        }
      });
      // Reset only outside the viewport, avoiding a visible jump while reading.
      ScrollTrigger.create({
        trigger: card, start: 'top bottom', end: 'bottom top',
        onLeave: () => animation.pause(0),
        onLeaveBack: () => animation.pause(0)
      });
    });
  });
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
