import { useEffect } from 'react';

import { ANIMATION } from '../constants';

export const useFadeInObserver = () => {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.fade-in-section'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      sections.forEach((section) => section.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('visible');
        }
      });
    }, { threshold: ANIMATION.SCROLL_THRESHOLD });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
};
