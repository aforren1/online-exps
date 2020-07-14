// should we use requestAnimationFrame timestamp (from listening for any number of events in Game.step) https://github.com/photonstorm/phaser/blob/8c977bc391296ac5510ce248906e0bf52f9cff4d/src/core/Game.js#L456, ]
// game.getTime(which is TimeStep.now, called each loop)
// this one: https://github.com/photonstorm/phaser/blob/v3.22.0/src/dom/RequestAnimationFrame.js#L106
// do the readPixels trick after postrender

/*
Timestamps through Phaser

 - Timestamp from "real" requestAnimationFrame ignored, as far as I can tell (https://github.com/photonstorm/phaser/blob/v3.22.0/src/dom/RequestAnimationFrame.js#L106 would have a time argument otherwise)
 - dom/RequestAnimationFrame `step()` calls `performance.now()` first thing in "real" requestAnimationFrame callback: https://github.com/photonstorm/phaser/blob/v3.22.0/src/dom/RequestAnimationFrame.js#L106, and passes that timestamp to another callback (TimeStep.step(), as far as I can tell)
 - TimeStep.js calls `performance.now()` again, apparently ignoring the time from dom/RequestAnimationFrame? (https://github.com/photonstorm/phaser/blob/8c977bc391296ac5510ce248906e0bf52f9cff4d/src/core/TimeStep.js#L480)
 - The TimeStep.js timestamp gets passed to the rest of the game/events/such (https://github.com/photonstorm/phaser/blob/8c977bc391296ac5510ce248906e0bf52f9cff4d/src/core/Game.js#L456)

*/

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: screen.width,
    height: screen.height,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    backgroundColor: '#2d2d2d',
    scene: {
        create: create
    },
    //desynchronized: true, // here be dragons (and also only works in chrome)
    stencil: false // presumably this saves us some amount of CPU/GPU?
};
