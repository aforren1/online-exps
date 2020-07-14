# Data Sources
MTurk
 - Not explicitly meant for behavioral tasks

Prolific

Sona Systems


# Implementation
PsychoPy Builder -> JS
 - 
jsPsych
Lab.js
Phaser 3
DIY (PixiJS + ...)


## Hosting
### Pavlovia
Pros:
 - Easy-ish integration? https://www.psychopy.org/online/onlineParticipants.html
 - Pretty widely used (as far as I can tell)

Cons:
 - Small fee (£0.20) per participant

### psiTurk
Pros:
 - Serve from lab machine

Cons:
 - More complicated to set up compared to alternatives?
 - Locked into MTurk (which may not necessarily be a negative, but...)


### Cognition.run
Announcement: https://twitter.com/javidalpe/status/1272936069747507202

Pros:
 - Seems batteries included (jsPsych by default)
 - Potentially flexible (jsPsych by default, but apparently not picky about other JS/css)
 - Free (for now)

Cons:
 - Very new-- unknown pain points?
 - 

## Nice links
https://psychopy.org/timing/2020/table3.html


## General things

 - Parsing params in URL: https://stackoverflow.com/a/55576345/2690232
 - How do we assign people to groups/conditions?
 - Perf-based pay (i.e. bonuses in MTurk terms), manually inspect/auto resolve?
 - How to generate a completion code?
 - Pre-experiment sanity checks?
 - Hand off user ID across sites
 - Do we need to do the whole MTurk->Qualtrics for sanity checks->real experiment? (note phaser can do all the DOM element stuff)
 - System checks (e.g. no mobile for certain tasks)
 - Groups of tasks all at once?
 - Benchmark different impls (psychoJS, jspsych, phaser)
 - Data formats: CSV for data (probably can't write incrementally?) vs JSON (many small files, but pretty universal)
 - Parsing CSV for conditions (e.g. for rotation, what's the rotation for this trial?)
 - Pause when not in fullscreen/restore to fullscreen (also see locking orientation on mobile)
 - Collecting demographics-- what's allowed (age, sex, race...) (we can apparently request particular participants in MTurk)
 - For tasks amenable to mobile, detect/test scaling (and add button to exit fullscreen) (see e.g. https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/)
 - Multi-session-- how?? Needs to be fairly elaborate w.r.t. keeping track of IDs, performance (early termination if not doing well), days since last session (e.g. https://blog.mturk.com/tutorial-best-practices-for-managing-workers-in-follow-up-surveys-or-longitudinal-studies-4d0732a7319b)
 - Completion code is generated on-the-fly (or should we do some elaborate handshake with another server to verify completion?)
 - What to do about partial completion? Are we allowed to keep anything?
 - Sprinkle comprehension tests (e.g. in reaching, "reach to the left circle to continue")
 - Write HIT code to file, so if there's an issue we can look it up (& record completion stuff)
 - Also query if code redeemed?
 - Helpers for checking data quality
 - Time limits? Or ways to detect funny business about peeking at task files (e.g. devtools-detect)
 - Can extract worker ID pretty automagically apparently: https://stackoverflow.com/questions/2916994/how-do-you-specify-the-requesters-workerid-in-a-mechanical-turk-hit/13727863#13727863
 - Then need to check off the bat against completed folks (so we would need some sort of database elsewhere?), or can amazon do that for us?
 - Apparently detecting the actual browser is very difficult? See e.g. https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
 - Phaser event loop: https://github.com/photonstorm/phaser/blob/b14b60516ad976ace77af563eb1200922d859c12/src/core/Game.js
 - psychoJS event loop: https://github.com/psychopy/psychojs/blob/1fc76d14618acd267d58677dd9e725d6b21f1a74/js/core/Window.js#L305
 - Fancy pants chrome feature: https://developers.google.com/web/updates/2019/05/desynchronized, https://bugzilla.mozilla.org/show_bug.cgi?id=1536809
   uses single buffer rendering
 - powerPreference (if interactive task like reaching)
 - Impossible to detect whether muted, what sort of audio device?
 - Detect if JS disabled (i.e. just show something if disabled) https://stackoverflow.com/questions/121203/how-to-detect-if-javascript-is-disabled
 - Detect mobile device? https://stackoverflow.com/a/29509267/2690232
 - Language https://stackoverflow.com/questions/17680413/get-visitors-language-country-code-with-javascript-client-side
 - High DPI https://phaser.io/phaser3/devlog/123
 - lock mobile orientation
 - option to download zip if failure to upload, and send for manual code (https://stuk.github.io/jszip/); any way to safely verify contents aren't disturbed?
 - Or serialize to bytes with sanity check at the beginning? Ask Chris F
 - Shared mailbox: https://yale.service-now.com/it?id=support_article&sys_id=b2acd67e1bbdb744d56efd13cd4bcb96
 - Special limited builds (if phaser)
 - PsychoJS uses gl.readPixels to block until done rendering (may not be necessary), and gl.finish to block until fully rendered (if we can ensure WebGL2, use fence sync objects?). 
 - Related, waiting for fence on worker: https://stackoverflow.com/questions/33640702/opengl-glclientwaitsync-on-separate-thread (NB WebGL 2 suppoort is spotty https://caniuse.com/#feat=webgl2)
 - https://computergraphics.stackexchange.com/questions/4964/how-to-know-when-rendering-is-complete-in-webgl
 - https://web.dev/measure/ for perf tips on site
 - Special survey code should be generated at the end of the task (though server needs to verify that all trials are done)
 - Should we not pay if participant fails all checks? or just bite the bullet and exclude the data (but pay)
 - Personal info to ask for (verify not counted as PHI): age (either exact or range), sex &| gender, race &| ethnicity
 - Copy to clipboard: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 - Browser version can be useful for understanding the resolution of `performance.now`
 - Get browser info, OS, etc. https://github.com/faisalman/ua-parser-js
 - For multiplayer, see how multiuser sketchpad does it (https://glitch.com/edit/#!/multiuser-sketchpad?path=README.md%3A1%3A0) i.e. binary websockets
 - Get partial data or something before tab closed: https://stackoverflow.com/questions/3888902/detect-browser-or-tab-closing
 - Catch bots at the beginning: https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget/
 - Prolific requires redirecting to specific site (how to: https://stackoverflow.com/questions/503093/how-do-i-redirect-to-another-webpage)
 - Handling the same study on prolific & mturk: pass parameters via URL, or check something like `document.referrer`? option 1 is easier
 - Handling group assignment across prolific & mturk-- (tentatively) assign as soon as link clicked
 - Upload zips to EliApps google drive (via google drive API, if possible)
 - Tried emscripten + SDL to get higher resolution clocks + no mouse acceleration, and was thoroughly unsuccessful (everything calls down to web tech in the end)
 - "native messaging" is an option, but intrusive (how do people install the app??)
 - Nice thread about MTurk https://discourse.psychopy.org/t/how-to-use-mturk-for-recruiting/8486/7
 - PsychoJS tries to block GPU immediately after calling pixi render() https://github.com/psychopy/psychojs/issues/19
 - does powerPreference *do* anything other than switch to dGPU if available??
 - Someone checking timing in phaser: https://phaser.discourse.group/t/question-about-timing-in-phaser/5443/4
 
# Linkz
https://sites.williams.edu/nk2/files/2018/10/VCK.pdf <-- this is gold, apparently (addresses most things I care about)
https://github.com/alan-s-lee/OnPoint <-- they have ok instructions about how they do online things
https://celss.iserp.columbia.edu/sites/default/files/content/documents/tutorials/MTurk_Tutorial_Apr_2020.pdf
https://blog.mturk.com/getting-great-survey-results-from-mturk-and-qualtrics-be1704ff9786 for getting an idea of dealing w/ submitted codes

# Another section

Modules/packages/??? to use:
 - phaser for graphics & such
 - devtools-detect for detecting if devtools opened
 - log4javascript for logging? + custom handling for logging to file https://github.com/psychopy/psychojs/blob/master/js/core/Logger.js (NB logging takes awhile)

# General flow 

1. User clicks on link from MTurk, Prolific, etc. (presumably this also filters people out who have already participated?)
2a. If multiple conditions, call home to server and get the right condition set 
2b. If one condition, chug on ahead?
2c. Actually in either case, generate the unique ID that the participant will be entering
3. Collect basic demographics (make sure we're not getting any PHI!) (and get any browser/OS/device info we can)
4. Start task.
5a. If decision-making sort of thing, call home for checking answers?
5b. If rotation/something innocuous, just send trial table at onset
6. Log periodically; messages/game state and/or actual (incomplete data). If they exit early, should we drop data automatically?
7. At the end, display an easy-to-copy code (if MTurk) or auto redirect (if prolific).
8a. If MTurk code fails to display (should we just send it at the beginning, and check all data is there?), give option to download zip & send to designated email
9. Run quick server-side checks (failed sanity/robot checks? basic individual-level plots?), email to designated email
10. Designated emailee checks report, and responds with "accept", "accept+bonus", "reject"?
11. If accept/accept+bonus, lock in as a success for that condition
12. If multi-day & accept, schedule an automated email for n days in the future (with message about adding bonus)

# Use cases

 - Generally desirable to not require 
 - For gambling-ish things (e.g. multi-armed bandit), probably best off getting server to check answers?
 - For reaching tasks, can send the trial table ahead of time (or bake it directly into the exp, depending)
 - For multi-user, lots of depends (sharing game state/physics? one other, two others?)
 - For multi-day, need to work out scheduling subsequent tasks & adding bonuses