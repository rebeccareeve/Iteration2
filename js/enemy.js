class enemy {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "slime", 0)
      .setDepth(5)
      .setBody()
      .setScale(0.5)
      .setFixedRotation()
      .setPosition(x, y);
  }

  sensors() {
    const Bodies = Phaser.Physics.Matter.Matter.Bodies;
    this.sensors = {
      left: Bodies.rectangle(this.sprite.x - 20 + 7, this.sprite.y, 4, 20, {
        isSensor: true
      }),
      right: Bodies.rectangle(this.sprite.x + 20 - 7, this.sprite.y, 4, 20, {
        isSensor: true
      })
    };

    const mainBody = this.sprite.body;

    const compoundBody = Phaser.Physics.Matter.Matter.Body.create({
      parts: [mainBody, this.sensors.left, this.sensors.right],
      friction: 0.001,
    });

    this.sprite.setExistingBody(compoundBody);
  }
}
