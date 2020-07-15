var config = {
    type: Phaser.AUTO,
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

var game = new Phaser.Game(config);

function create()
{
    this.input.once('pointerup', function () {
        this.scale.startFullscreen();
    }, this);
    this.cameras.main.setBounds(-config.width / 2, -config.height / 2,
        config.width, screen.height);
    var target = this.add.circle(0,
        -parseInt(screen.height * 0.4), parseInt(screen.height * 0.05),
        0xffffff // fill color
    );

    var line = this.add.rectangle(
        0, parseInt(screen.height * 0.35),
        screen.height, 5,
        0xbbbbbb
    )

    this.timeline = makeTimeline(this, target);
    this.target = target;
}

var t0 = 0;
var t1 = 0;


function update(time, delta) {
    if (!this.timeline.isPlaying()) {
        // TODO: log the time from the next frame
        this.timeline = makeTimeline(this, this.target);
        this.timeline.play();
        this.timeline.on('start', function () {
            t0 = time;
        })
        this.timeline.on('complete', function () {
            console.log(game.loop.time - t0);
        })
    }
}

function makeTimeline(scene, target) {
    var timeline = scene.tweens.createTimeline();
    timeline.add({
        targets: target,
        scaleY: 0.2,
        ease: 'Sine.easeOut',
        duration: 500
    });
    timeline.add({
        targets: target,
        scaleY: 1,
        ease: 'Sine.easeOut',
        duration: 100
    });
    timeline.add({
        targets: target,
        y: { start: -parseInt(screen.height * 0.4), to: parseInt(screen.height * 0.35) },
        ease: 'linear',
        duration: 600
    });
    return timeline;
}