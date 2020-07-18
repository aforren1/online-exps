var audioContext;

try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: 0 });
} catch (e) {
    console.error(e);
}


var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 400,
    height: 400,
    scale: {
        autoCenter: Phaser.Scale.CENTER_VERTICALLY
    },
    backgroundColor: '#000000',
    scene: {
        preload: preload,
        create: create
    },
    audio: {
        context: audioContext
    },
    //desynchronized: true, // here be dragons (and also only works in chrome)
    stencil: false, // presumably this saves us some amount of CPU/GPU?
    antialias: false,
    
};
var game = new Phaser.Game(config);

function preload() {
    this.load.audio('beep', ['./beep_500ms.wav']);
}

function create() {
    this.input.once('pointerup', function () {
        this.scale.startFullscreen();
    }, this);
    var beep = this.sound.add('beep');

    var rect = this.add.rectangle(20, 200, 40, 40, 0xffffff);
    rect.visible = 0;
    var keyObj = this.input.keyboard.addKey('NINE');  // Get key object
    keyObj.on('down', function (event) {
        beep.play();
        rect.visible = 1;
    });
    keyObj.on('up', function (event) {
        beep.stop();
        rect.visible = 0;
    });
}