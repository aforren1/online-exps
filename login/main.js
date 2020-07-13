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
    var text = this.add.text(10, 10, 'Age will show here.', { color: 'white', fontFamily: 'Arial', fontSize: '32px'});
    var element = this.add.dom(400, 300).createFromCache('form');
    element.addListener('click');

    element.on('click', function (event) {
        // this probably isn't the ideal way to get info,
        // and note the validation is currently nonexistant!
        if (event.target.name === 'submit') {
            var radios = document.getElementsByName('sex');
            for (var i = 0, len = radios.length; i < len; i++) {
                if (radios[i].checked) {
                    sex = radios[i].value;
                    break;
                }
            }
            var races = [];
            var checks = document.getElementsByName('race');
            for (var i = 0, len = checks.length; i < len; i++) {
                if (checks[i].checked) {
                    races.push(checks[i].value);
                }
            }
            radios = document.getElementsByName('ethnicity');
            for (var i = 0, len = radios.length; i < len; i++) {
                if (radios[i].checked) {
                    ethnicity = radios[i].value;
                    break;
                }
            }
            var info = {
                username: this.getChildByName('username').value,
                age: this.getChildByName('age').value,
                sex: sex,
                races: races,
                ethnicity: ethnicity
            };
            text.setText(info.age);
            console.log(JSON.stringify(info));
        }
    });
}
