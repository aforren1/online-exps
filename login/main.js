// entirely from https://phaser.io/examples/v3/view/game-objects/dom-element/form-input#
// also demonstrates doing full screen without making the entire canvas fullscreen
var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 750,
  parent: "app",
  scale: {
    autoCenter: Phaser.Scale.CENTER,
  },
  dom: {
    createContainer: true,
  },
  scene: {
    preload: preload,
    create: create,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
    },
  },
};

var element;
var game = new Phaser.Game(config);

function preload() {
  this.load.html("form", "form2.html");
}

function create() {
  this.scale.fullscreenTarget = document.getElementById("app");
  this.input.once(
    "pointerup",
    function () {
      this.scale.startFullscreen();
    },
    this
  );
  this.cameras.main.setBounds(
    -config.width / 2,
    -config.height / 2,
    config.width,
    config.height
  );
  this.cameras.main.setBackgroundColor("rgb(100, 100, 100)");
  text = this.add.text(
    0,
    300,
    "Other settings in console.\nFullscreen+DOM element does not\nwork well yet.",
    { color: "green", fontFamily: "Arial", fontsize: "24px" }
  );
  text.setOrigin(0.5, 0.5);
  var text = this.add.text(0, -300, "Age will show here.", {
    color: "white",
    fontFamily: "Arial",
    fontSize: "32px",
  });
  text.setOrigin(0.5, 0.5);
  var element = this.add.dom(0, 0).createFromCache("form");
  element.addListener("click");

  element.on("click", function (event) {
    // this probably isn't the ideal way to get info,
    // and note the validation is currently nonexistant!
    if (event.target.name === "submit") {
      var radios = document.getElementsByName("sex");
      for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked) {
          sex = radios[i].value;
          break;
        }
      }
      var races = [];
      var checks = document.getElementsByName("race");
      for (var i = 0, len = checks.length; i < len; i++) {
        if (checks[i].checked) {
          races.push(checks[i].value);
        }
      }
      radios = document.getElementsByName("eth");
      for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked) {
          ethnicity = radios[i].value;
          break;
        }
      }
      var info = {
        username: this.getChildByName("username").value,
        age: this.getChildByName("age").value,
        sex: sex,
        races: races,
        ethnicity: ethnicity,
      };
      text.setText(info.age);
      console.log(JSON.stringify(info));
    }
  });

  var r1 = this.add.circle(-200, -100, 80, 0x99bbee);
  var r2 = this.add.circle(200, 100, 90, 0xeebb99);
  this.physics.world.setBounds(
    -config.width / 2,
    -config.height / 2,
    config.width,
    config.height
  );
  this.physics.add.existing(r1);
  this.physics.add.existing(r2);
  this.physics.add.collider(r1, r2);
  r1.body.velocity.x = 300;
  r1.body.velocity.y = 250;
  r1.body.bounce.x = 1;
  r1.body.bounce.y = 1;
  r1.body.collideWorldBounds = true;

  r2.body.velocity.x = -250;
  r2.body.velocity.y = -300;
  r2.body.bounce.x = 1;
  r2.body.bounce.y = 1;
  r2.body.collideWorldBounds = true;
}
