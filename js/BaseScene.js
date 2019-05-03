class BaseScene extends Phaser.Scene {
  constructor(id) {
    super(id)
    this.id = id;
  }

  preload() {
    this.load.tilemapTiledJSON(this.tileDataKey, this.tileDataSource);
    this.load.image('city', 'assets/background/skyline-a.png');
    this.load.image('cityClose', 'assets/background/near-buildings-bg.png');
    this.load.image("buildingTiles", "assets/building/tileset.png");
    this.load.image("officeTiles", "assets/building/Office_furniture_set.png");
  }

  create() {
    this.map = this.make.tilemap({
      key: this.tileDataKey
    });
    this.buildingTileset = this.map.addTilesetImage("BuildingTileset", "buildingTiles");
    this.officeTileset = this.map.addTilesetImage("Office_furniture_set", "officeTiles");
    this.backgroundLayer = this.map.createStaticLayer("Background", this.buildingTileset, 0, 0).setDepth(3);
    this.buildingLayer = this.map.createDynamicLayer("Building", this.buildingTileset, 0, 0).setDepth(3);
    this.objectsLayer = this.map.createStaticLayer("Objects", this.officeTileset, 0, 0).setDepth(3);
    this.decorationsLayer = this.map.createStaticLayer("Decorations", this.officeTileset, 0, 0).setDepth(3);
    this.decorationsDarkLayer = this.map.createStaticLayer("Decorations Dark", this.buildingTileset, 0, 0).setDepth(3);

    this.add.image(0, 0, 'city', null).setOrigin(0, 0).setScale(7).setDepth(0);
    this.add.image(800, 0, 'city', null).setOrigin(0, 0).setScale(7).setDepth(0);
    this.add.image(1500, 0, 'city', null).setOrigin(0, 0).setScale(7).setDepth(0);
    this.add.image(50, 250, 'cityClose', null).setOrigin(0, 0).setScale(5).setDepth(1);

    this.cameras.addExisting(this.scene.get('SpriteScene').cameras.main, true);
  }


  update(time, delta) {}
}
