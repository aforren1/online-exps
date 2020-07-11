window.addEventListener('devtoolschange', event => {
    console.log('Is DevTools open:', event.detail.isOpen);
    console.log('DevTools orientation:', event.detail.orientation);
});

var parser = new UAParser();
console.log(JSON.stringify(parser.getResult()));

var config = {
    type: Phaser.WEBGL,
    width: screen.width,// * window.devicePixelRatio,
    height: screen.height,// * window.devicePixelRatio,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    autoRound: false,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: {
        create: create,
        update: update
    }
};

var follower;
var path;
var graphics;

var game = new Phaser.Game(config);

function create ()
{
    this.cameras.main.setBounds(-screen.width / 2, -screen.height / 2, screen.width, screen.height);
    graphics = this.add.graphics();
    var r1 = this.add.circle(-100, -100, 80, 0x6666ff);
    r1.setInteractive();
    r1.on('pointerup', function () {
        if (this.scale.isFullscreen) { this.scale.stopFullscreen(); }
        else { this.scale.startFullscreen(); }

    }, this);
    follower = { t: 0, vec: new Phaser.Math.Vector2() };
    path = new Phaser.Curves.Path(50, 500);
    path.splineTo([ 164, 446, 274, 542, 412, 457, 522, 541, 664, 464 ]);
    path.lineTo(700, 300);
    path.lineTo(600, 350);
    path.ellipseTo(200, 100, 100, 250, false, 0);
    path.cubicBezierTo(222, 144, 308, 107, 208, 368);
    path.ellipseTo(60, 60, 0, 360, true);

    this.tweens.add({
        targets: follower,
        t: 1,
        ease: 'Sine.easeInOut',
        duration: 2000,
        yoyo: true,
        repeat: -1
    });
}

function update ()
{
    graphics.clear();
    graphics.lineStyle(2, 0xffffff, 1);

    path.draw(graphics);

    path.getPoint(follower.t, follower.vec);

    graphics.fillStyle(0xff0000, 1);
    graphics.fillCircle(follower.vec.x, follower.vec.y, 12);
    graphics.fillStyle(0x00ff00, 1);
    graphics.fillCircle(0, 0, 24);
}
