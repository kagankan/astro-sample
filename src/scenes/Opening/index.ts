import imageSea from '@/assets/images/hawaii_islands_map.png';

export default class OpeningScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OpeningScene' });
  }

  preload() {
    this.load.image(imageSea, imageSea);
  }

  create() {
    const { width, height } = this.game.scale;
    const backgroundSea = this.add.tileSprite(0, 0, width, height, imageSea).setOrigin(0).setTileScale(1);
    this.events.on('update', (time: number) => {
      const speedX = 1 / 40;
      const speedY = 1 / 20;
      backgroundSea.setTilePosition(-time * speedX, -time * speedY);
    });

    this.add.dom(0, 0, 'div').setClassName('OpeningScene').setOrigin(0);
  }
}
