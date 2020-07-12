// entirely from https://phaser.io/examples/v3/view/game-objects/dom-element/form-input#
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    dom: {
        createContainer: true
    },
    scene: {
        preload: preload,
        create: create
    }
};

var element;
var game = new Phaser.Game(config);

function preload ()
{
    this.load.html('form', 'form.html');
}

function create()
{
    var text = this.add.text(10, 10, 'Name will show here.', { color: 'white', fontFamily: 'Arial', fontSize: '32px'});
    var element = this.add.dom(400, 300).createFromCache('form');
    element.setPerspective(800);
    element.addListener('click');

    element.on('click', function (event) {

        if (event.target.name === 'loginButton') {
            var username = this.getChildByName('username');
            if (username.value !== '') {
                text.setText(username.value);
            }
        }
    });
}
