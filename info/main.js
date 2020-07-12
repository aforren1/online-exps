window.addEventListener('devtoolschange', event => {
    console.log('Is DevTools open:', event.detail.isOpen);
    console.log('DevTools orientation:', event.detail.orientation);
});

var parser = new UAParser();
console.log(JSON.stringify(parser.getResult()));

var config = {
    type: Phaser.WEBGL,
    width: 400,// * window.devicePixelRatio,
    height: 400,// * window.devicePixelRatio,
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
    this.cameras.main.setBounds(-config.width / 2, -config.height / 2, config.width, config.height);
    graphics = this.add.graphics();
    follower = { t: 0, vec: new Phaser.Math.Vector2() };
    path = new Phaser.Curves.Path(100, 0);
    path.circleTo(100, true);

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
