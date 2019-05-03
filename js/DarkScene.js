class DarkScene extends BaseScene {
  constructor() {
    super('DarkScene')
    this.tileDataKey = 'mapDark'
    this.tileDataSource = 'assets/MobileGameMapDark.json'
  }
  preload() {
    super.preload();
    this.load.image("screenFace", "assets/building/face.png");
  }

  create() {
    super.create();
    this.monitorTileset = this.map.addTilesetImage("monitor-face-4", "screenFace");
    this.facesLayer = this.map.createStaticLayer("Faces", this.monitorTileset, 0, 0).setDepth(3);
    this.scene.get('DarkScene').scene.setVisible(false);
  }
}
