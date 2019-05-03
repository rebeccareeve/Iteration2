var config = {
  type: Phaser.WEBGL, //Phaser.AUTO
  width: 2272,
  height: 1280,
  backgroundColor: '#000000',
  parent: 'phaser-example',
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        y: 1
      },
      debug: false,
      debugBodyColor: 0xffffff
    }
  },
  scene: [Tutorial, LightScene, DarkScene, SpriteScene, UIScene, Restart, GameOver],
  callbacks: {
    postBoot: function() {}
  },
  plugins: {
    scene: [{
      plugin: PhaserMatterCollisionPlugin, // The plugin class
      key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
      mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
    }]
  },
  scale: {
    mode: Phaser.Scale.FIT
  }
};

var game = new Phaser.Game(config);

function trackEvent(action, label, value) {
  var str = "Mobile Game local event tracking: action = " + action + ", label = " + label + ", value = " + value;
  console.log(str)
  gtag('event', action, {
    'event_catagory': 'Mobile Game',
    'event_label': label,
    'value': value
  });
}
