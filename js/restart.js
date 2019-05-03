class Restart extends Phaser.Scene {
  constructor(id) {
    super('Restart');
    this.id = 'Restart';
  }

  preload() {
    this.load.image('restart', 'assets/text/restart.png');
    this.load.spritesheet('textRestart', 'assets/text/endText.png', {
      frameWidth: 190,
      frameHeight: 20,
    });
    this.load.image('backgroundScreen', 'assets/background/backgroundScreen.png');
  }

  create() {
    this.createTextAnims();
    this.restartText = this.add.sprite(1150, 300, 'textRestart').setDepth(12).setScale(7);
    this.add.image(200, 300, 'backgroundScreen').setScale(12);
    new Button(this, 1130, 1070, 'restart').sprite.setInteractive().on('pointerdown', this.restartGame, this);
    this.playTextAnims();
  }
  update(time, delta) {}

  createTextAnims() {
    var anim = this.anims.create({
      key: 'textAnimation',
      frames: this.anims.generateFrameNumbers('textRestart', {
        start: 0,
        end: 17
      }),
      repeat: 0,
      frameRate: 5
    });
  }

  playTextAnims() {
    this.restartText.play('textAnimation', true)
  }

  restartGame() {
    location.reload()
  }
}
