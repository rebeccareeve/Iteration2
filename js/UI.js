class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene')
  }
  preload() {
    this.load.spritesheet('leftButton', 'assets/ui/left.png', {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet('rightButton', 'assets/ui/right.png', {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet('upButton', 'assets/ui/up.png', {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet('switchButton', 'assets/ui/switch.png', {
      frameWidth: 80,
      frameHeight: 80,
    });
  }
  create() {
    console.log(this);
    this.buttons = {
      left: new Button(this, 170, 1115, 'leftButton').sprite.setInteractive().on('pointerdown', function() {this.scene.manager.getScene('SpriteScene').player.movement.left = true}, this),
      right: new Button(this, 540, 1115, 'rightButton').sprite.setInteractive().on('pointerdown', function() {this.scene.manager.getScene('SpriteScene').player.movement.right = true}, this),
      jump: new Button(this, 2115, 1115, 'upButton').sprite.setInteractive().on('pointerdown', function() {
        if (this.scene.manager.getScene('SpriteScene').player.allowJump) {
          this.scene.manager.getScene('SpriteScene').player.movement.jump = true
        }
      }, this),
      switch: new Button(this, 2115, 160, 'switchButton').sprite.setInteractive().on('pointerdown', function() {this.scene.manager.getScene('SpriteScene').player.movement.switch = true}, this),
    }
    this.buttons.left.on('pointerup', function() {this.scene.manager.getScene('SpriteScene').player.movement.left = false}, this);
    this.buttons.left.on('pointerout', function() {this.scene.manager.getScene('SpriteScene').player.movement.left = false}, this);
    this.buttons.right.on('pointerup', function() {this.scene.manager.getScene('SpriteScene').player.movement.right = false}, this);
    this.buttons.right.on('pointerout', function() {this.scene.manager.getScene('SpriteScene').player.movement.right = false}, this);
    this.buttons.right.on('touchend', function() {this.scene.manager.getScene('SpriteScene').player.movement.right = false}, this);
  }
}
