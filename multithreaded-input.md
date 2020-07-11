General idea: copying toon, use pair of lock/buffer to write data from devices
Use SDL for device access (broad support across browsers)
Use Web Worker for threadedness (pthreads not there yet)


Links:
(sharing mem between web workers): https://stackoverflow.com/questions/59818702/can-you-share-webassembly-memory-between-web-workers
(building SDL): https://www.jamesfmackenzie.com/2019/12/01/webassembly-graphics-with-sdl/
(building SDL): https://github.com/shlomnissan/sdl-wasm
(older SharedArrayBuffer example): https://exploringjs.com/es2016-es2017/ch_shared-array-buffer.html
("new" wasm memory docs): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Memory
(accessing memory between wasm and C): https://stackoverflow.com/questions/46748572/how-to-access-webassembly-linear-memory-from-c-c
