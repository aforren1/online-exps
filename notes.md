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

# Linkz
https://sites.williams.edu/nk2/files/2018/10/VCK.pdf <-- this is gold, apparently (addresses most things I care about)
https://github.com/alan-s-lee/OnPoint <-- they have ok instructions about how they do online things
https://celss.iserp.columbia.edu/sites/default/files/content/documents/tutorials/MTurk_Tutorial_Apr_2020.pdf
