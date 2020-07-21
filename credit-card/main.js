var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: screen.height,
    height: screen.height,
    scale: {
        //mode: Phaser.Scale.FIT, // we don't want to change pixel size relationships
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    backgroundColor: '#2d2d2d',
    scene: {
        preload: preload,
        create: create
    },
    //desynchronized: true, // here be dragons (and also only works in chrome)
    stencil: false // presumably this saves us some amount of CPU/GPU?
};

function preload()
{
    var url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js';
    this.load.plugin('rexsliderplugin', url, true);
}
function create ()
{
    this.input.once('pointerup', function () {
        this.scale.startFullscreen();
    }, this);
    this.cameras.main.setBounds(-config.width / 2, -config.height / 2, config.width, config.height);
    var line = this.add.rectangle(0, 400, 800, 20, 0xffffff);

    var slide_cir = this.add.circle(0, 0, 50, 0x222222).setStrokeStyle(2, 0xff0000, 2).setOrigin(0.5, 0.5);
    var slide_txt = this.add.text(0, 0, 'Drag Me', { color: 'white', fontFamily: 'Arial', fontSize: '26px' }).setOrigin(0.5, 0.5);
    var slide_handle = this.add.container(0, 400, [slide_cir, slide_txt]).setSize(400, 400);
    var slider = this.plugins.get('rexsliderplugin').add(slide_handle, {
        endPoints: [
            {
                x: slide_handle.x - 400,
                y: slide_handle.y
            },
            {
                x: slide_handle.x + 400,
                y: slide_handle.y
            },
        ],
        value: 0.5
    });
    // standard banking/ID card is 85.6 x 53.98 mm (https://en.wikipedia.org/wiki/ISO/IEC_7810#ID-1)
    // we specify that in pixels to start, plus an initial scaling factor of 5
    var sizer = this.add.rectangle(-100, -100, 85.6 * 5, 53.98 * 5, 0x6666ff);

    var corner_note = this.add.text(-sizer.width / 2 - 120 -100, -sizer.height / 2 - 100 -100, 'Align credit card\nwith this corner',
        { color: 'white', fontFamily: 'Arial', fontSize: '32px' });
    
    var scale_factor_txt = this.add.text(0, -500, '', { color: 'white', fontFamily: 'Arial', fontSize: '40px' }).setOrigin(0.5, 0.5);

    slider.on('valuechange', function (newValue, prevValue) {
        var scale_factor = newValue * 10;
        sizer.width = 85.6 * scale_factor; // mm * (pix/mm)
        sizer.height = 53.98 * scale_factor;
        // pix * (mm/pix) = mm
        // mm * (pix/mm) = pix
        // scale factor is (pix/mm)
        scale_factor_txt.text = 'Scale factor (pix per mm) ' + scale_factor.toFixed(4);
    });
}


var game = new Phaser.Game(config);
