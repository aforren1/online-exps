var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: screen.width,
    height: screen.height,
    backgroundColor: '#2d2d2d',
    scene: {
        create: create
    },
    desynchronized: true, // here be dragons (and also only works in chrome)
    stencil: false
};

function create ()
{
    this.input.once('pointerup', function () {
        this.scale.startFullscreen();
    }, this);
    this.cameras.main.setBounds(-config.width / 2, -config.height / 2, config.width, config.height);

    // using a custom cursor image is best for latency (b/c we're subbing out the hardware cursor), but browser support (particularly Edge/IE) is finicky
    // should also be a .cur file for compat (see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Basic_User_Interface/Using_URL_values_for_the_cursor_property)
    // cur creator (can import png) https://www.cursor.cc, which also allows for setting hotspot 
    this.input.setDefaultCursor('url(cursor.cur), pointer');
    this.input.setPollAlways(); // TODO necessary?

    var target = this.add.rectangle(0, 0, 80, 60, 0x6666ff);
    target.setInteractive();
    target.on('pointerover', function () {
        target.setFillStyle(0xff6666);
    });
    target.on('pointerout', function () {
        target.setFillStyle(0x6666ff);
    });

    var rotcursor = this.add.circle(0, 0, 18);
    var jscursor = this.add.circle(0, 0, 18);
    rotcursor.setFillStyle(0x11ff22);
    jscursor.setFillStyle(0xff33ff);
    this.input.on('pointermove', function (pointer) {
        // worldX/Y give pointer relative to most recent camera
        jscursor.x = pointer.worldX;
        jscursor.y = pointer.worldY;
        var tmp = Phaser.Math.Rotate({x: pointer.worldX, y: pointer.worldY}, Phaser.Math.DegToRad(30));
        rotcursor.x = tmp.x;
        rotcursor.y = tmp.y;
    });
}


var game = new Phaser.Game(config);

