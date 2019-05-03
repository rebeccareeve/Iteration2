class cupboardStack {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "cupboardStack", 0)
      .setDepth(4)
      .setBody()
      .setScale(1)
      .setPosition(x, y)
      .setStatic(true)
  }
}

class cupboard {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "cupboard", 0)
      .setDepth(4)
      .setBody()
      .setScale(1)
      .setPosition(x, y)
      .setStatic(true)
  }
}

class stairs {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "stairs", 0)
      .setDepth(4)
      .setBody()
      .setScale(0.7)
      .setPosition(x, y)
      .setStatic(true)
      .setVisible(false)
  }
}

class stairsx2 {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "stairsx2", 0)
      .setDepth(4)
      .setBody()
      .setScale(0.7)
      .setPosition(x, y)
      .setStatic(true)
      .setVisible(false)
  }
}

class platform {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "platform", 0)
      .setDepth(4)
      .setBody()
      .setScale(1)
      .setPosition(x, y)
      .setStatic(true)
      .setVisible(false)
  }
}

class barrier {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "barrier", 0)
      .setDepth(4)
      .setBody()
      .setScale(1.25)
      .setPosition(x, y)
      .setStatic(true)
  }
}

class keyCard {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "keyCardSprite", 0)
      .setDepth(4)
      .setBody()
      .setScale(0.1)
      .setPosition(x, y)
      .setStatic(true)
      .setSensor(false)
  }
}

class locker {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "locker", 0)
      .setDepth(4)
      .setBody()
      .setScale(1)
      .setPosition(x, y)
      .setStatic(true)
  }
}

class printer {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "printer", 0)
      .setDepth(4)
      .setBody()
      .setScale(1)
      .setPosition(x, y)
      .setStatic(true)
  }
}

class desk {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "desk", 0)
      .setDepth(4)
      .setBody()
      .setScale(1)
      .setPosition(x, y)
      .setVisible(false)
      .setStatic(true)
  }
}

class chair {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "chair1", 0)
      .setDepth(4)
      .setBody()
      .setScale(1)
      .setPosition(x, y)
      .setVisible(false)
      .setStatic(true)
  }
}

class wiredDesk {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "wiredDesk", 0)
      .setDepth(4)
      .setBody()
      .setScale(1)
      .setPosition(x, y)
      .setVisible(true)
      .setStatic(true)
  }
}

class brick {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "brick", 0)
      .setDepth(4)
      .setBody()
      .setScale(2)
      .setPosition(x, y)
      .setVisible(true)
      .setStatic(true)
  }
}

class wall {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "wall", 0)
      .setDepth(6)
      .setBody()
      .setScale(1)
      .setPosition(x, y)
      .setVisible(true)
      .setStatic(true)
  }
}


class lift {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "barrier", 0)
      .setDepth(4)
      .setBody()
      .setScale(0.6)
      .setPosition(x, y)
      .setVisible(false)
      .setStatic(true)
  }
}

class portal {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "portal", 0)
      .setDepth(4)
      .setBody()
      .setScale(0.5)
      .setPosition(x, y)
      .setVisible(true)
      .setStatic(true)
      .setSensor(true)
  }
}

class light {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "light", 0)
      .setDepth(8)
      .setBody()
      .setScale(1.5)
      .setPosition(x, y)
      .setVisible(true)
      .setStatic(false)
  }
}

class laserBlue {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "laserBlue", 0)
      .setDepth(11)
      .setScale(0.8)
      .setPosition(x, y)
      .setStatic(true)
      .setSensor(true)
  }
}

class laserRed {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "laserRed", 0)
      .setDepth(11)
      .setScale(0.8)
      .setPosition(x, y)
      .setStatic(true)
      .setSensor(true)
  }
}

class laserBlueMedium {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "laserBlueMedium", 0)
      .setDepth(11)
      .setScale(0.8)
      .setPosition(x, y)
      .setStatic(true)
      .setSensor(true)
  }
}

class laserRedMedium {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "laserRedMedium", 0)
      .setDepth(11)
      .setScale(0.8)
      .setPosition(x, y)
      .setStatic(true)
      .setSensor(true)
  }
}

class laserRedLarge {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.matter.add
      .sprite(0, 0, "laserRedLarge", 0)
      .setDepth(11)
      .setScale(0.8)
      .setPosition(x, y)
      .setStatic(true)
      .setSensor(true)
  }
}
