class LightScene extends BaseScene {
  constructor() {
    super('LightScene')
    this.tileDataKey = 'map'
    this.tileDataSource = 'assets/MobileGameMap.json'
  }
  preload() {
    super.preload();
  }
  create() {
    super.create();
    this.liftsLayer = this.map.createStaticLayer("Lifts", this.officeTileset, 0, 0).setDepth(3);

    this.scene.launch('SpriteScene');
    this.scene.launch('UIScene');
    this.scene.launch('DarkScene');
  }
}
