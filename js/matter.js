class SpriteScene extends Phaser.Scene {
  constructor() {
    super('SpriteScene')
    this.id = 'SpriteScene';
    this.switchAnimationRunning = false;
  }

  preload() {}

  create() {
    this.matter.world.setBounds(0, 0, 2272, 1265);
    this.player = new Player(this, 20, 1240); // Start Position is (this, 20, 1240)
    this.slime1 = new enemy(this, 1500, 1240), this.slime2 = new enemy(this, 290, 1081), this.slime3 = new enemy(this, 1300, 900);
    this.cameras.main.setBounds(0, 0, 2272, 1280);
    this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);
    this.cameras.main.zoom = 7; // When playing set camera to 7
    this.input.addPointer();
    this.input.addPointer();
    var mouseSpring = this.matter.add.mouseSpring();
    mouseSpring.constraint.collisionFilter.category = 0x0064
    mouseSpring.constraint.collisionFilter.mask = 0x0016
    this.shader = this.add.image(0, 0, 'shader').setScale(10).setVisible(false);
    this.player.sprite.on('animationcomplete', this.switchAnimComplete, this);
    this.player.sensors();
    this.slime1.sensors(), this.slime2.sensors(), this.slime3.sensors();
    this.setSlimeVelocityX = 2;
    this.createAnimations()
    this.createLights()

    // AUDIO
    {
      this.music = this.sound.add('backgroundMusic', {
        loop: true,
        volume: 0.5
      });
      this.SFX = this.sound.add('hurt', {
        loop: false,
        volume: 0.5
      });
      this.collected = this.sound.add('collected', {
        loop: false,
        volume: 0.5
      });
    }

    // CREATING THE BUILDING
    {
      this.leftWall = this.matter.add.rectangle(195, 850, 30, 700, {
        isStatic: true,
      });
      this.rightWall = this.matter.add.rectangle(2265, 910, 15, 705, {
        isStatic: true,
      });

      this.firstFloor = this.matter.add.rectangle(1193, 1095, 1965, 16, {
        isStatic: true,
      });
      for (var i = 0; i < 3; i++) {
        this.floor(1230, (920 - 175 * i), 2050, 16)
      };
    }

    // CREATING OBJECTS + SPRITES FOR SCENES
    {
      this.keyCardSecondFloor = new keyCard(this, 770, 1048), this.keyCardThirdFloor = new keyCard(this, 1175, 838), this.keyCardFourthFloor = new keyCard(this, 1900, 680);
      this.liftSecondFloor = new lift(this, 230, 1047), this.liftThirdFloor = new lift(this, 2233, 873), this.liftFourthFloor = new lift(this, 230, 695);
      this.portal = new portal(this, 1300, 530), this.portalSensor = new lift(this, 1310, 530);
      this.cupboardStackSecondFloor = new cupboardStack(this, 993, 1040), this.cupboard = new cupboard(this, 960, 720);
      this.stairsThirdFloorLightScene1 = new stairs(this, 1135, 896), this.stairsThirdFloorLightScene2 = new stairs(this, 1225, 896), this.stairsThirdFloorDarkScene = new stairs(this, 0, 0);
      this.stairsx2ThirdFloorLightScene = new stairsx2(this, 1180, 879), this.stairsx2ThirdFloorDarkScene = new stairsx2(this, 0, 0);
      this.platform1 = new platform(this, 0, 0), this.platform2 = new platform(this, 0, 0), this.platform3 = new platform(this, 0, 0), this.platform4 = new platform(this, 0, 0), this.platform5 = new platform(this, 1080, 1010);
      this.barrierFirstFloorLightScene = new barrier(this, 2200, 1185), this.barrierSecondFloorDarkScene = new barrier(this, 970, 1010), this.barrierThirdFloorDarkScene = new barrier(this, 1190, 835), this.barrierThirdFloorLightScene = new barrier(this, 1800, 835);
      this.desk = new desk(this, 0, 0), this.chair = new chair(this, 0, 0), this.wiredDesk1 = new wiredDesk(this, 672, 724), this.wiredDesk2 = new wiredDesk(this, 1135, 724);
      this.blueLaser1 = new laserBlue(this, 2100, 655), this.blueLaser2 = new laserBlue(this, 1850, 655), this.blueLaser3 = new laserBlueMedium(this, 1600, 655), this.blueLaser4 = new laserBlueMedium(this, 900, 715), this.blueLaser5 = new laserBlue(this, 350, 655);
      this.redLaser1 = new laserRedLarge(this, 1233, 640), this.redLaser2 = new laserRed(this, 1950, 655), this.redLaser3 = new laserRedMedium(this, 1600, 655), this.redLaser4 = new laserRedMedium(this, 900, 715);
      this.brickL1 = new brick(this, 790, 1184), this.brickL2 = new brick(this, 790, 1216), this.brickM1 = new brick(this, 820, 1248), this.brickM2 = new brick(this, 820, 1152), this.brickR1 = new brick(this, 850, 1184), this.brickR2 = new brick(this, 850, 1216);
      this.locker1 = new locker(this, 1090, 712), this.locker2 = new locker(this, 889, 712), this.locker3 = new locker(this, 905, 712);
      this.lightPlatform1 = new light(this, 1050, 670), this.lightPlatform1.sprite.setStatic(true), this.lightPlatform2 = new light(this, 840, 670), this.lightPlatform2.sprite.setStatic(true), this.lightPlatform3 = new light(this, 1270, 830), this.lightPlatform3.sprite.setStatic(true);
      this.printer = new printer(this, 760, 717);
      this.bridge1 = new brick(this, 1460, 845), this.bridge2 = new brick(this, 1510, 870), this.bridge3 = new brick(this, 1560, 845);
      this.bridge1.sprite.setScale(1.3), this.bridge2.sprite.setScale(1.3), this.bridge3.sprite.setScale(1.3);
      this.wall = new wall(this, 192, 1232);
      this.block = new stairsx2(this, 1600, 1055), this.block.sprite.setVisible(true);
      this.redLaser3.sprite.setRectangle(5, 420).setStatic(true).setSensor(true), this.blueLaser3.sprite.setRectangle(5, 420).setStatic(true).setSensor(true), this.redLaser4.sprite.setRectangle(5, 420).setStatic(true).setSensor(true), this.blueLaser4.sprite.setRectangle(5, 420).setStatic(true).setSensor(true);
    }

    // COLLISION CHECKS
    {
      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.down],
        callback: function() {
          this.player.allowJump = true
        },
        context: this
      });
      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right],
        objectB: this.portalSensor.sprite,
        callback: this.enterPortal,
        context: this
      });
      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right, this.player.sensors.down, this.player.sensors.up],
        objectB: [this.redLaser1.sprite, this.redLaser2.sprite, this.redLaser3.sprite, this.redLaser4.sprite],
        callback: this.damagePlayer,
        context: this
      }), this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right, this.player.sensors.down, this.player.sensors.up],
        objectB: [this.blueLaser1.sprite, this.blueLaser2.sprite, this.blueLaser3.sprite, this.blueLaser4.sprite, this.blueLaser5.sprite],
        callback: this.damagePlayer,
        context: this
      });
      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right],
        objectB: [this.slime1.sprite, this.slime2.sprite, this.slime3.sprite],
        callback: this.damagePlayer,
        context: this
      });
      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right],
        objectB: this.liftSecondFloor.sprite,
        callback: this.lifts1,
        context: this
      }), this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right],
        objectB: this.liftThirdFloor.sprite,
        callback: this.lifts2,
        context: this
      }), this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right],
        objectB: this.liftFourthFloor.sprite,
        callback: this.lifts3,
        context: this
      });
      this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right, this.player.sensors.down],
        objectB: this.keyCardSecondFloor.sprite,
        callback: this.pickUpCard1,
        context: this
      }), this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right, this.player.sensors.down],
        objectB: this.keyCardThirdFloor.sprite,
        callback: this.pickUpCard2,
        context: this
      }), this.matterCollision.addOnCollideStart({
        objectA: [this.player.sensors.left, this.player.sensors.right, this.player.sensors.down],
        objectB: this.keyCardFourthFloor.sprite,
        callback: this.pickUpCard3,
        context: this
      });
      this.matterCollision.addOnCollideStart({
        objectA: [this.slime3.sensors.left],
        callback: this.pathways,
        context: this
      }), this.matterCollision.addOnCollideStart({
        objectA: [this.slime3.sensors.right],
        callback: this.pathwaysReverse,
        context: this
      });
    }
  }

  liftLeft(x, y, width, height) {
    this.matter.add.rectangle(x, y, width, height, {
      isStatic: true,
    });
  }
  liftRight(x, y, width, height) {
    this.matter.add.rectangle(x, y, width, height, {
      isStatic: true,
    });
  }
  lifts1(playersprite, lift) {
    this.player.sprite.y = 900;
  }
  lifts2(playersprite, lift) {
    this.player.sprite.y = 715;
  }
  lifts3(playersprite, lift) {
    this.player.sprite.y = 535;
  }

  floor(x, y, width, height) {
    this.matter.add.rectangle(x, y, width, height, {
      isStatic: true,
    });
  }

  pickUpCard1(playersprite, keycard) {
    this.keyCardSecondFloor.sprite.setVisible(false).setPosition(0, 0);
    this.collected.play();
  }
  pickUpCard2(playersprite, keycard) {
    this.keyCardThirdFloor.sprite.setVisible(false).setPosition(0, 0);
    this.collected.play();
  }
  pickUpCard3(playersprite, keycard) {
    this.keyCardFourthFloor.sprite.setVisible(false).setPosition(0, 0);
    this.collected.play();
  }

  pathways() {
    this.setSlimeVelocityX = 2;
    this.slime1.sprite.flipX = true;
    this.slime2.sprite.flipX = true;
    this.slime3.sprite.flipX = true;
  }
  pathwaysReverse() {
    this.setSlimeVelocityX = -2;
    this.slime1.sprite.flipX = false;
    this.slime2.sprite.flipX = false;
    this.slime3.sprite.flipX = false;
  }

  enterPortal() {
    this.scene.run('GameOver');
    trackEvent('Win', 'PlayerWins', this.enterPortal);
  }

  playerJump() {
    if (!this.switchAnimationRunning) {
      if (this.player.movement.jump) {
        this.player.movement.jump = false;
        this.player.allowJump = false
        this.player.sprite.setVelocityY(-6);
      } else {}
    }
  }

  update() {
    this.checkPlayerMovement();
    this.playObjectAnimations();
    this.playerJump();
    this.laserRotations();
    this.playerDeath();
    this.slime1.sprite.setVelocityX(this.setSlimeVelocityX), this.slime2.sprite.setVelocityX(this.setSlimeVelocityX), this.slime3.sprite.setVelocityX(this.setSlimeVelocityX);
    if (!this.music.isPlaying) {
      this.music.play();
    }
  }

  checkPlayerMovement() {
    if (this.player.movement.switch && this.switchAnimationRunning == false) {
      this.player.sprite.anims.stop();
      this.switchAnimationRunning = true;
    }
    if (this.switchAnimationRunning) {
      this.player.sprite.play("characterSwitch", true);
    } else {
      if (this.player.movement.left) {
        this.player.sprite.setVelocityX(-4);
        this.player.sprite.flipX = true;
        this.player.sprite.anims.play("characterWalk", true);
      } else if (this.player.movement.right) {
        this.player.sprite.setVelocityX(4);
        this.player.sprite.flipX = false;
        this.player.sprite.anims.play("characterWalk", true);
      } else {
        this.player.sprite.setVelocityX(0)
        if (!this.switchAnimationRunning) {}
        this.player.sprite.anims.play("characterIdle", true);
      }
    }
  }

  switchAnimComplete(animation, frame) {
    if (animation.key === "characterSwitch") {
      if (this.scene.isVisible('DarkScene')) {
        this.scene.get('LightScene').scene.setVisible(true);
        this.scene.get('DarkScene').scene.setVisible(false);
        this.lightScene();
      } else {
        this.scene.get('LightScene').scene.setVisible(false);
        this.scene.get('DarkScene').scene.setVisible(true);
        this.darkScene();
      }
      this.switchAnimationRunning = false;
      this.player.movement.switch = false;
    }
  }

  laserRotations() {
    this.blueLaser3.sprite.setRotation(Phaser.Math.DegToRad(68)), this.blueLaser4.sprite.setRotation(Phaser.Math.DegToRad(90));
    this.redLaser1.sprite.setRotation(Phaser.Math.DegToRad(90)), this.redLaser3.sprite.setRotation(Phaser.Math.DegToRad(291)), this.redLaser4.sprite.setRotation(Phaser.Math.DegToRad(90));
  }

  damagePlayer() {
    this.player.health--;
    this.SFX.play();
  }

  playerDeath() {
    if (this.player.health <= 0) {
      this.matter.scene.scene.pause('SpriteScene');
      this.music.setVolume(0);
      this.playerRestart();
      trackEvent('Die', 'PlayerDeath', this.playerDeath);
    }
  }

  playerRestart() {
    this.scene.run('Restart');
  }

  lightScene() {
    if (this.scene.get('LightScene').scene.isVisible()) {
      this.stairsThirdFloorLightScene1.sprite.setVisible(true).setPosition(1135, 896), this.stairsThirdFloorLightScene2.sprite.setVisible(true).setPosition(1225, 896), this.stairsx2ThirdFloorLightScene.sprite.setVisible(true).setPosition(1180, 879);
      this.stairsThirdFloorDarkScene.sprite.setVisible(false).setPosition(0, 0), this.stairsx2ThirdFloorDarkScene.sprite.setVisible(false).setPosition(0, 0);
      this.platform1.sprite.setVisible(false).setPosition(0, 0), this.platform2.sprite.setVisible(false).setPosition(0, 0), this.platform3.sprite.setVisible(false).setPosition(0, 0), this.platform4.sprite.setVisible(false).setPosition(0, 0), this.platform5.sprite.setVisible(false).setPosition(0, 0);
      this.barrierFirstFloorLightScene.sprite.setVisible(true).setPosition(2200, 1185), this.barrierThirdFloorLightScene.sprite.setVisible(true).setPosition(1800, 835);
      this.barrierSecondFloorDarkScene.sprite.setVisible(false).setPosition(0, 0), this.barrierThirdFloorDarkScene.sprite.setVisible(false).setPosition(0, 0);
      this.keyCardSecondFloor.sprite.setVisible(true), this.keyCardThirdFloor.sprite.setVisible(true), this.keyCardFourthFloor.sprite.setVisible(false);
      this.slime1.sprite.setPosition(this.slime1.sprite.x, this.slime1.sprite.y), this.slime2.sprite.setPosition(this.slime2.sprite.x, this.slime2.sprite.y), this.slime3.sprite.setPosition(this.slime3.sprite.x, this.slime3.sprite.y); // this.slime4.sprite.setPosition(this.slime4.sprite.x, this.slime4.sprite.y);
      this.desk.sprite.setVisible(false).setPosition(0, 0).setStatic(true), this.chair.sprite.setVisible(false).setPosition(0, 0).setStatic(true);
      this.liftSecondFloor.sprite.setPosition(230, 1047), this.liftThirdFloor.sprite.setPosition(2233, 873), this.liftFourthFloor.sprite.setPosition(230, 695);
      this.blueLaser1.sprite.setVisible(false).setPosition(0, 0), this.blueLaser2.sprite.setVisible(false).setPosition(0, 0), this.blueLaser3.sprite.setVisible(false).setPosition(0, 0), this.blueLaser4.sprite.setVisible(false).setPosition(0, 0), this.blueLaser5.sprite.setVisible(false).setPosition(0, 0);
      this.redLaser1.sprite.setVisible(true).setPosition(1233, 640), this.redLaser2.sprite.setVisible(true).setPosition(1950, 655), this.redLaser3.sprite.setVisible(true).setPosition(1600, 655), this.redLaser4.sprite.setVisible(true).setPosition(900, 715);
      this.brickL1.sprite.setPosition(790, 1184).setVisible(true), this.brickL2.sprite.setPosition(790, 1216).setVisible(true);
      this.brickR1.sprite.setPosition(0, 0).setVisible(false), this.brickR2.sprite.setPosition(0, 0).setVisible(false);
      this.bridge1.sprite.setVisible(false).setPosition(0, 0), this.bridge2.sprite.setVisible(false).setPosition(0, 0), this.bridge3.sprite.setVisible(false).setPosition(0, 0);
      this.wall.sprite.setVisible(true).setPosition(192, 1232);
      this.shader.setVisible(false);
    }
  }

  darkScene() {
    if (this.scene.get('DarkScene').scene.isVisible()) {
      this.stairsThirdFloorLightScene1.sprite.setVisible(false).setPosition(0, 0), this.stairsThirdFloorLightScene2.sprite.setVisible(false).setPosition(0, 0), this.stairsx2ThirdFloorLightScene.sprite.setVisible(false).setPosition(0, 0);
      this.stairsThirdFloorDarkScene.sprite.setVisible(true).setPosition(1895, 896), this.stairsx2ThirdFloorDarkScene.sprite.setVisible(true).setPosition(1850, 879);
      this.platform1.sprite.setVisible(true).setPosition(2035, 1240), this.platform2.sprite.setVisible(true).setPosition(2095, 1207), this.platform3.sprite.setVisible(true).setPosition(2160, 1178), this.platform4.sprite.setVisible(true).setPosition(2222, 1146), this.platform5.sprite.setVisible(true).setPosition(1080, 1040);
      this.barrierFirstFloorLightScene.sprite.setVisible(false).setPosition(0, 0), this.barrierThirdFloorLightScene.sprite.setVisible(false).setPosition(0, 0);
      this.barrierSecondFloorDarkScene.sprite.setVisible(true).setPosition(970, 1010), this.barrierThirdFloorDarkScene.sprite.setVisible(true).setPosition(1190, 835);
      this.keyCardSecondFloor.sprite.setVisible(false), this.keyCardThirdFloor.sprite.setVisible(false), this.keyCardFourthFloor.sprite.setVisible(true);
      this.slime1.sprite.setPosition(this.slime1.sprite.x, this.slime1.sprite.y), this.slime2.sprite.setPosition(this.slime2.sprite.x, this.slime2.sprite.y), this.slime3.sprite.setPosition(this.slime3.sprite.x, this.slime3.sprite.y); // this.slime4.sprite.setPosition(this.slime4.sprite.x, this.slime4.sprite.y);
      this.desk.sprite.setVisible(true).setPosition(1380, 1080).setStatic(false), this.chair.sprite.setVisible(true).setPosition(1880, 1080).setStatic(false);
      this.liftSecondFloor.sprite.setPosition(0, 0), this.liftThirdFloor.sprite.setPosition(0, 0), this.liftFourthFloor.sprite.setPosition(0, 0);
      this.blueLaser1.sprite.setVisible(true).setPosition(2100, 655), this.blueLaser2.sprite.setVisible(true).setPosition(1850, 655), this.blueLaser3.sprite.setVisible(true).setPosition(1600, 655), this.blueLaser4.sprite.setVisible(true).setPosition(900, 715), this.blueLaser5.sprite.setVisible(true).setPosition(350, 655);
      this.redLaser1.sprite.setVisible(false).setPosition(0, 0), this.redLaser2.sprite.setVisible(false).setPosition(0, 0), this.redLaser3.sprite.setVisible(false).setPosition(0, 0), this.redLaser4.sprite.setVisible(false).setPosition(0, 0);
      this.brickL1.sprite.setPosition(0, 0).setVisible(false), this.brickL2.sprite.setPosition(0, 0).setVisible(false);
      this.brickR1.sprite.setPosition(850, 1184).setVisible(true), this.brickR2.sprite.setPosition(850, 1216).setVisible(true);
      this.bridge1.sprite.setVisible(true).setPosition(1460, 845), this.bridge2.sprite.setVisible(true).setPosition(1510, 870), this.bridge3.sprite.setVisible(true).setPosition(1560, 845);
      this.wall.sprite.setVisible(false).setPosition(0, 0);
      this.shader.setVisible(true);
    }
  }

  playObjectAnimations() {
    this.keyCardSecondFloor.sprite.anims.play("keyCardFlash", true), this.keyCardThirdFloor.sprite.anims.play("keyCardFlash", true), this.keyCardFourthFloor.sprite.anims.play("keyCardFlash", true);
    this.slime1.sprite.anims.play('enemy', true), this.slime2.sprite.anims.play('enemy', true), this.slime3.sprite.anims.play('enemy', true); // this.slime4.sprite.anims.play('enemy', true);
    this.portal.sprite.anims.play('portal', true);
    this.redLaser1.sprite.anims.play('laserRedLongFlash', true), this.redLaser2.sprite.anims.play('laserRedFlash', true), this.redLaser3.sprite.anims.play('laserRedMedFlash', true), this.redLaser4.sprite.anims.play('laserRedMedFlash', true);
    this.blueLaser1.sprite.anims.play('laserBlueFlash', true), this.blueLaser2.sprite.anims.play('laserBlueFlash', true), this.blueLaser3.sprite.anims.play('laserBlueMedFlash', true), this.blueLaser4.sprite.anims.play('laserBlueMedFlash', true), this.blueLaser5.sprite.anims.play('laserBlueFlash', true);
  }

  createAnimations() {
    this.anims.create({
      key: "characterIdle",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 4
      }),
      repeat: -1,
      frameRate: 15
    });
    this.anims.create({
      key: "characterWalk",
      frames: this.anims.generateFrameNumbers("walk", {
        start: 0,
        end: 5
      }),
      repeat: -1,
      frameRate: 15
    });
    this.anims.create({
      key: "characterSwitch",
      frames: this.anims.generateFrameNumbers("switch", {
        start: 0,
        end: 8
      }),
      repeat: 0,
      frameRate: 10
    });
    this.anims.create({
      key: 'keyCardFlash',
      frames: this.anims.generateFrameNumbers('keyCardSprite', {
        start: 0,
        end: 10
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'enemy',
      frames: this.anims.generateFrameNumbers('slime', {
        start: 0,
        end: 2
      }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: 'portal',
      frames: this.anims.generateFrameNumbers('portal', {
        start: 3,
        end: 12
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'laserRedFlash',
      frames: this.anims.generateFrameNumbers('laserRed', {
        start: 0,
        end: 6
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'laserBlueFlash',
      frames: this.anims.generateFrameNumbers('laserBlue', {
        start: 0,
        end: 6
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'laserBlueMedFlash',
      frames: this.anims.generateFrameNumbers('laserBlueMed', {
        start: 0,
        end: 6
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'laserRedMedFlash',
      frames: this.anims.generateFrameNumbers('laserRedMed', {
        start: 0,
        end: 5
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: 'laserRedLongFlash',
      frames: this.anims.generateFrameNumbers('laserRedLong', {
        start: 0,
        end: 5
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  createLights() {
    this.lightB = new light(this, 1370, 780)
    this.matter.add.worldConstraint(this.lightB.sprite, 90, 1, {
      pointA: {
        x: 1320,
        y: 750
      },
      pointB: {
        x: -20,
        y: 0
      }
    });
    this.matter.add.worldConstraint(this.lightB.sprite, 90, 1, {
      pointA: {
        x: 1400,
        y: 750
      },
      pointB: {
        x: 20,
        y: 0
      }
    });
    this.lightC = new light(this, 1670, 780)
    this.matter.add.worldConstraint(this.lightC.sprite, 90, 1, {
      pointA: {
        x: 1620,
        y: 750
      },
      pointB: {
        x: -20,
        y: 0
      }
    });
    this.matter.add.worldConstraint(this.lightC.sprite, 90, 1, {
      pointA: {
        x: 1700,
        y: 750
      },
      pointB: {
        x: 20,
        y: 0
      }
    });
    this.lightD = new light(this, 1770, 780)
    this.matter.add.worldConstraint(this.lightD.sprite, 90, 1, {
      pointA: {
        x: 1720,
        y: 750
      },
      pointB: {
        x: -20,
        y: 0
      }
    });
    this.matter.add.worldConstraint(this.lightD.sprite, 90, 1, {
      pointA: {
        x: 1800,
        y: 750
      },
      pointB: {
        x: 20,
        y: 0
      }
    });
  }
}

function trackEvent(action, label, value) {
  var str = "Mobile Game local event tracking: action = " + action + ", label = " + label + ", value = " + value;
  console.log(str)
  gtag('event', action, {
    'event_catagory': 'Mobile Game',
    'event_label': label,
    'value': value
  });
}
