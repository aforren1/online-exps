
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: screen.width,
    height: screen.height,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    backgroundColor: '#2d2d2d',
    scene: {
        create: create
    },
    desynchronized: true, // here be dragons (and also only works in chrome)
    stencil: false // presumably this saves us some amount of CPU/GPU?
};

function create() {
    this.input.once('pointerup', function () {
        this.scale.startFullscreen();
    }, this);
    this.cameras.main.setBounds(-config.width / 2, -config.height / 2, config.width, config.height);

    var cursor = this.add.circle(0, 0, 17.5, 0xff00ff);

    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", function(event) {
            // alpha: rotation around z-axis
            cursor.x += event.acceleration.x;
            cursor.y += event.acceleration.y;
            cursor.x = Phaser.Math.Wrap(cursor.x, -game.renderer.width/2, game.renderer.width/2);
            cursor.y = Phaser.Math.Wrap(cursor.y, -game.renderer.height/2, game.renderer.height/2);
        }, true);
    } else {
        this.input.on('pointermove', function (pointer) {
            // worldX/Y give pointer relative to most recent camera
            cursor.x += pointer.worldX;
            cursor.y += pointer.worldY;
            cursor.x = Phaser.Math.Wrap(cursor.x, -game.renderer.width/2, game.renderer.width/2);
            cursor.y = Phaser.Math.Wrap(cursor.y, -game.renderer.height/2, game.renderer.height/2);
        });
    }
}

var game = new Phaser.Game(config);
