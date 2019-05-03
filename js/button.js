class Button {
  constructor(scene, x, y, texture) {
    this.scene = scene;
    this.sprite = this.scene.matter.add
      .sprite(x, y, texture, null)
      .setOrigin(0.5, 0.5)
      .setScale(3.5)
      .setDepth(6)
      .setStatic(true)
      .setScrollFactor(0)
  }
}
