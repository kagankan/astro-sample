import Phaser from 'phaser';
import OpeningScene from '@/scenes/Opening';

const dom = <HTMLElement>document.getElementById('app');
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  fps: {
    target: 30,
    forceSetTimeOut: true,
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  dom: {
    createContainer: true,
  },
  scene: [OpeningScene],
  parent: dom,
};
new Phaser.Game(config);
