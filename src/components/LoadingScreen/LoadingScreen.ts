import { showLogo, hideLoadingScreen } from './functions';

showLogo();

// ロードに時間がかかる場合のためタイムアウトを設ける
setTimeout(() => {
  hideLoadingScreen();
}, 3000);
