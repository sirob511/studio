'use client';
import {useEffect} from 'react';

/** Content stays visible without JavaScript; only offscreen sections get an entrance. */
export function HomeMotion({rootSelector = '.home-page', revealAhead = 0}: {rootSelector?: string; revealAhead?: number}) {
  useEffect(() => {
    const root = document.querySelector(rootSelector);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!root || preference.matches || !('IntersectionObserver' in window)) return;
    const elements = [...root.querySelectorAll<HTMLElement>('[data-home-reveal]')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.revealState = 'visible';
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: revealAhead > 0 ? 0 : 0.08, rootMargin: `0px 0px ${revealAhead}px 0px`});
    elements.forEach(element => {
      if (element.getBoundingClientRect().top >= window.innerHeight + revealAhead) {
        element.dataset.revealState = 'waiting';
        observer.observe(element);
      }
    });
    function revealFocused(event: Event) {
      if (!(event.target instanceof Element)) return;
      const section = event.target.closest<HTMLElement>('[data-home-reveal]');
      if (section) {
        section.dataset.revealState = 'visible';
        observer.unobserve(section);
      }
    }
    function revealAll() {
      observer.disconnect();
      elements.forEach(element => { delete element.dataset.revealState; });
    }
    root.addEventListener('focusin', revealFocused);
    preference.addEventListener('change', revealAll);
    return () => {
      revealAll();
      root.removeEventListener('focusin', revealFocused);
      preference.removeEventListener('change', revealAll);
    };
  }, [rootSelector, revealAhead]);
  return null;
}
