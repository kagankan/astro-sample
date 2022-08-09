import gsap from 'gsap';
import { id } from './data';

const showLogo = () => {
  gsap.to(`#${id} [data-loading-text]`, {
    opacity: 1,
    duration: 0.2,
  });
};
showLogo();

const hideLoadingScreen = (duration = 1, delay = 1) => {
  const target = document.getElementById(id);
  if (target?.style.display !== 'none') {
    gsap.to(target, {
      opacity: 0,
      display: 'none',
      duration: duration,
      delay: delay,
    });
  }
};
hideLoadingScreen();
