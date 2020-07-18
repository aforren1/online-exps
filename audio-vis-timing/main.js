// blink a square, play a sound when key pressed

// make our own AudioContext, so we can pass flags
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

function selecter(t) {
    return (t >= 1.0 ? 1.0 : 0);
}

function preload() {
    this.load.audio('beep', ['./beep.wav']);
}

function create()
{
    this.input.once('pointerup', function () {
        this.scale.startFullscreen();
    }, this);

    beep = this.sound.add('beep');

    this.rect = this.add.rectangle(20, 200, 40, 40, 0xffffff);
    this.rect.visible = 0;
    var timeline = this.tweens.createTimeline({ loop: -1 });

    timeline.add({
        targets: this.rect,
        visible: 1,
        ease: selecter,
        duration: 500,
        onComplete: function () { beep.play(); },
        onCompleteParams: [beep]
    }); // TODO: play audio when TWEEN_COMPLETE fired

    timeline.add({
        targets: this.rect,
        visible: 0,
        ease: selecter,
        duration: 100,
        delay: 100,
        offset: '-=100',
    });
    timeline.calcDuration();
    timeline.play();
    console.log(timeline.duration);

}