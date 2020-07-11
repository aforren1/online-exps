

var MainScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function MainScene() {
        Phaser.Scene.call(this, { key: 'mainScene' });
        this.blob;
    },
    create: function () {
        this.cameras.main.setBounds(-screen.width / 2, -screen.height / 2,
            screen.width, screen.height);
        this.blob = this.add.rectangle(0, 0, 80, 40, 0x6666ff);
        this.blob.setStrokeStyle(4, 0xffffff);
        this.tweens.add({
            targets: this.blob,
            angle: 180,
            duration: 500,
            ease: 'Linear',
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

    }
});

var PauseScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function PauseScene() {
        Phaser.Scene.call(this, { key: 'pauseScene' });
        this.button;
    },
    create: function () {
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
