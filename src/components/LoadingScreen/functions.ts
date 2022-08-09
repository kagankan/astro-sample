import gsap from 'gsap';
import { id } from './data';

const start = Date.now();

export const showLogo = () => {
  gsap.to(`#${id} [data-loading-text]`, {
    opacity: 1,
    duration: 0.2,
  });
};

export const hideLoadingScreen = (duration = 1, delay = 1) => {
  const loadTime = (Date.now() - start) / 1000;
  const target = document.getElementById(id);
  if (target?.style.display !== 'none') {
    gsap.to(target, {
      opacity: 0,
      display: 'none',
      duration: duration,
      // 最低1秒表示する
      delay: Math.max(0, delay - loadTime),
    });
  }
};
