
var MainScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function MainScene() {
        Phaser.Scene.call(this, { key: 'mainScene' });
        this.blob;
    },
    create: function () {
        this.cameras.main.setBounds(-screen.width / 2, -screen.height / 2,
            screen.width, screen.height);
        this.counter = 0;
        this.text = this.add.text(0, 100, this.counter, { color: 'white', fontFamily: 'Arial', fontSize: '32px' });
        this.text.setOrigin(0.5, 0.5);
        this.blob = this.add.rectangle(0, 0, 80, 40, 0x6666ff);
        this.blob.setStrokeStyle(4, 0xffffff);
        this.tweens.add({
            targets: this.blob,
            angle: 180,
            duration: 500,
            ease: 'Sine.InOut',
            yoyo: true,
            repeat: -1
        });
        this.input.once('pointerup', function () {
            this.scale.startFullscreen();
        }, this);
        this.scale.on('fullscreenunsupported', function () {
            console.log('Fullscreen unsupported!');
        }, this);
        this.scale.on('leavefullscreen', function () {
            this.scene.pause();
            this.scene.launch('pauseScene');
        }, this);
        // just in case, pausing when focus lost
        this.game.events.on('hidden', function () {
            this.scene.pause();
            this.scene.launch('pauseScene');
        }, this);

    },
    update: function () {
        this.counter += 0.1;
        this.text.setText(parseInt(this.counter));
    }
});

var PauseScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function PauseScene() {
        Phaser.Scene.call(this, { key: 'pauseScene' });
        this.button;
    },
    create: function () {
        this.cameras.main.setBackgroundColor('rgba(1, 1, 1, 0.7)');
        this.button = this.add.circle(100, 100, 60, 0xff0000);
        this.button.setInteractive();
        this.button.on('pointerup', function () {
            this.scale.startFullscreen();
            this.scene.resume('mainScene');
            this.scene.sleep();
        }, this);
    }

})
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
    scene: [MainScene, PauseScene]
};

var game = new Phaser.Game(config);
