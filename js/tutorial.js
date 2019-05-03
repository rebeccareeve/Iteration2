class Tutorial extends Phaser.Scene {
  constructor(id) {
    super('Tutorial');
    this.id = 'Tutorial';
  }

  preload() {
    // LOAD IMAGES
    this.load.image('backgroundScreen', 'assets/background/backgroundScreen.png');
    this.load.image('left', 'assets/ui/left.png');
    this.load.image('right', 'assets/ui/right.png');
    this.load.image('up', 'assets/ui/up.png');
    this.load.image('switchbtn', 'assets/ui/switch.png');
    this.load.image('movement', 'assets/text/movement.png');
    this.load.image('jump', 'assets/text/jump.png');
    this.load.image('switchRealities', 'assets/text/switchRealities.png');
    this.load.image('avoid', 'assets/text/avoid.png');
    this.load.image('collect', 'assets/text/collect.png');
    this.load.image('shader', 'assets/background/blueGradientTransparent.png');
    this.load.image('light', 'assets/building/light.png');
    this.load.image('chair1', 'assets/building/chair1.png');
    this.load.image('chair2', 'assets/building/chair2.png');
    this.load.image('printer', 'assets/building/printer.png');
    this.load.image('cupboard', 'assets/building/cupboard.png');
    this.load.image('stairs', 'assets/building/stairs.png');
    this.load.image('stairsx2', 'assets/building/stairsx2.png');
    this.load.image('desk', 'assets/building/desk.png');
    this.load.image('locker', 'assets/building/locker.png');
    this.load.image('platform', 'assets/building/platform.png');
    this.load.image('barrier', 'assets/building/barrier.png');
    this.load.image('laserRedLarge', 'assets/lasers/redLaserLarge.png');
    this.load.image('brick', 'assets/building/brick.png');
    this.load.image('wiredDesk', 'assets/building/wiredDesk.png');
    this.load.image('wall', 'assets/building/wall.png');
    // LOAD AUDIO
    this.load.audio('backgroundMusic', 'assets/audio/backgroundMusic.mp3');
    this.load.audio('hurt', 'assets/audio/impact.mp3');
    this.load.audio('collected', 'assets/audio/collected.mp3');
    // LOAD SPRITES
    this.load.spritesheet('start', 'assets/text/start.png', {
      frameWidth: 90,
      frameHeight: 30,
    });
    this.load.spritesheet("player", 'assets/character/SpriteSheetIdle.png', {
      frameWidth: 21,
      frameHeight: 50,
    });
    this.load.spritesheet("walk", "assets/character/SpriteSheetWalk.png", {
      frameWidth: 23,
      frameHeight: 50
    });
    this.load.spritesheet("switch", "assets/character/SpriteSheetAction.png", {
      frameWidth: 34,
      frameHeight: 50
    });
    this.load.spritesheet("keyCardSprite", "assets/pickUps/keyCardSpriteSheetNB.png", {
      frameWidth: 159,
      frameHeight: 159
    });
    this.load.spritesheet("cupboardStack", "assets/building/cupboardStack.png", {
      frameWidth: 23,
      frameHeight: 160
    });
    this.load.spritesheet("slime", "assets/enemies/Slime.png", {
      frameWidth: 62,
      frameHeight: 42
    });
    this.load.spritesheet("portal", "assets/portal/portal.png", {
      frameWidth: 182,
      frameHeight: 206
    });
    this.load.spritesheet("laserRed", 'assets/lasers/redLaserSS.png', {
      frameWidth: 9,
      frameHeight: 205,
    });
    this.load.spritesheet("laserRedMed", 'assets/lasers/redLaserMedSS.png', {
      frameWidth: 8,
      frameHeight: 550,
    });
    this.load.spritesheet("laserRedLong", 'assets/lasers/redLaserLongSS.png', {
      frameWidth: 9,
      frameHeight: 2560,
    });
    this.load.spritesheet("laserBlue", 'assets/lasers/blueLaserSS.png', {
      frameWidth: 9,
      frameHeight: 207,
    });
    this.load.spritesheet("laserBlueMed", 'assets/lasers/blueLaserMedSS.png', {
      frameWidth: 8,
      frameHeight: 550,
    });
  }

  create() {
    this.add.image(200, 350, 'backgroundScreen').setScale(12);
    this.add.image(400, 450, 'left').setScale(3);
    this.add.image(700, 450, 'right').setScale(3);
    this.add.image(1150, 450, 'up').setScale(3);
    this.add.image(1750, 450, 'switchbtn').setScale(3);
    this.add.image(550, 250, 'movement').setScale(3);
    this.add.image(1150, 250, 'jump').setScale(3);
    this.add.image(1780, 250, 'switchRealities').setScale(3);
    this.add.image(350, 800, 'collect').setScale(0.6);
    this.add.image(2000, 800, 'avoid').setScale(0.6);
    new Button(this, 1130, 1050, 'start').sprite.setInteractive().on('pointerdown', this.startGame, this);
    this.collect = new keyCard(this, 350, 980), this.collect.sprite.setScale(0.9);
    this.avoid = new enemy(this, 2020, 990), this.avoid.sprite.setStatic(true).setScale(3);
    this.createObjectAnims();
    this.playObjectAnims();
  }

  update(time, delta) {}

  startGame() {
    this.scene.start('LightScene');
  }

  createObjectAnims() {
    this.anims.create({
      key: 'cardAnim',
      frames: this.anims.generateFrameNumbers('keyCardSprite', {
        start: 0,
        end: 10
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'avoidAnim',
      frames: this.anims.generateFrameNumbers('slime', {
        start: 0,
        end: 2
      }),
      frameRate: 4,
      repeat: -1,
    });
  }

  playObjectAnims() {
    this.collect.sprite.play('cardAnim', true);
    this.avoid.sprite.play('avoidAnim', true);
  }
}
