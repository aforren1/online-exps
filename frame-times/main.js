
/*
Timestamps through Phaser

 - Timestamp from "real" requestAnimationFrame ignored, as far as I can tell (https://github.com/photonstorm/phaser/blob/v3.22.0/src/dom/RequestAnimationFrame.js#L106 would have a time argument otherwise)
 - dom/RequestAnimationFrame `step()` calls `performance.now()` first thing in "real" requestAnimationFrame callback: https://github.com/photonstorm/phaser/blob/v3.22.0/src/dom/RequestAnimationFrame.js#L106, and passes that timestamp to another callback (TimeStep.step(), as far as I can tell)
 - TimeStep.js calls `performance.now()` again, apparently ignoring the time from dom/RequestAnimationFrame? (https://github.com/photonstorm/phaser/blob/8c977bc391296ac5510ce248906e0bf52f9cff4d/src/core/TimeStep.js#L480)
 - The TimeStep.js timestamp gets passed to the rest of the game/events/such (https://github.com/photonstorm/phaser/blob/8c977bc391296ac5510ce248906e0bf52f9cff4d/src/core/Game.js#L456)

 Chrome, windows:
 In cursory tests, the difference between the "real" rAF and fake is roughly 300us, but saw at least one ~800us delay
 Difference between real rAF and the TimeStep one is up to a millisecond

 Firefox, windows:
 Differences between "real" rAF and fake 1-2ms, and "real" vs TimeStep up to 3ms (NB that firefox has reduced timestamp precision by default, but it looks like the "real" rAF is recorded down to the 10s of microseconds)


 We can match psychopy directly by using readPixels, or do a little better (maybe) by using fence sync for webgl2 contexts
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

var game = new Phaser.Game(config);

function create() { }
