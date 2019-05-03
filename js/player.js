class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "player", 0)
      .setDepth(5)
      .setBody()
      .setScale(1)
      .setFixedRotation()
      .setPosition(x, y)
      .setBounce(0.01)
      .setMass(0.5)
      .setFriction(0.01)
    this.movement = {
      left: false,
      right: false,
      up: false,
      switch: false,
    }
    this.allowJump = false;
    this.health = 5;
  }
  switch () {
    this.movement.switch = !this.movement.switch
  }
  update() {}

  sensors() {
    const Bodies = Phaser.Physics.Matter.Matter.Bodies;
    this.sensors = {
      left: Bodies.rectangle(this.sprite.x - 20 + 7, this.sprite.y, 4, 50, {
        isSensor: true
      }),
      right: Bodies.rectangle(this.sprite.x + 20 - 7, this.sprite.y, 4, 50, {
        isSensor: true
      }),
      down: Bodies.rectangle(this.sprite.x, this.sprite.y + 25, 24, 4, {
        isSensor: true
      })
    };

    const mainBody = this.sprite.body;

    const compoundBody = Phaser.Physics.Matter.Matter.Body.create({
      parts: [mainBody, this.sensors.left, this.sensors.right, this.sensors.down],
      friction: 0.001,
    });

    this.sprite.setExistingBody(compoundBody);
  }
}
