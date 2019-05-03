class GameOver extends Phaser.Scene {
  constructor(id) {
    super('GameOver');
    this.id = 'GameOver';
  }

  preload() {
    this.load.image('backgroundScreen', 'assets/background/backgroundScreen.png');
    this.load.image('Congratulations', 'assets/text/congratulations.png');
    this.load.image('playAgain', 'assets/text/playAgain.png');
    this.load.spritesheet('playerAllAnims', 'assets/character/playerAllAnims.png', {
      frameWidth: 34,
      frameHeight: 50,
    });
  }

  create() {
    this.add.image(200, 300, 'backgroundScreen').setScale(12);
    this.playerAnim = this.add.sprite(1150, 750, 'playerAllAnims').setDepth(12).setScale(5);
    this.wellDone = this.add.image(1100, 300, 'Congratulations').setScale(8);
    new Button(this, 1130, 1070, 'playAgain').sprite.setInteractive().on('pointerdown', this.startGame, this);
    this.createPlayerAnims();
    this.playAnims();
  }

  update(time, delta) {}

  createPlayerAnims() {
    var anims = this.anims.create({
      key: 'playerAnimations',
      frames: this.anims.generateFrameNumbers('playerAllAnims', {
        start: 0,
        end: 25
      }),
      repeat: -1,
      frameRate: 5
    });
  }

  playAnims() {
    this.playerAnim.play('playerAnimations', true)
  }

  startGame() {
    location.reload()
  }
}
