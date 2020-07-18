var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 400,
    parent: 'phaser-example',
    scene: {
        create: create
    }
};


var game = new Phaser.Game(config);

function create() {
    var text = this.add.text(200, 200, 'Press the "9" key.', { color: 'green', fontFamily: 'Arial', fontSize: '32px' });
    var text2 = this.add.text(200, 300, '');
    var text3 = this.add.text(200, 330, '');
    var text4 = this.add.text(200, 360, '');
    text.setOrigin(0.5, 0.5);
    text2.setOrigin(0.5, 0.5);
    text3.setOrigin(0.5, 0.5);
    text4.setOrigin(0.5, 0.5);
    var keyObj = this.input.keyboard.addKey('NINE');  // Get key object
    keyObj.on('down', function (event) {
        text2.setText('Press time: ' + event.timeDown);
    });
    keyObj.on('up', function (event) {
        text3.setText('Release time: ' + event.timeUp);
        text4.setText('Event duration: ' + event.duration);
    });
}
