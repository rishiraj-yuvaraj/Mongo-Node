const os = require ("os");

console.log("Free Memory:", os.freemem()/1024/1024/1024);
console.log("Total Memory:", os.totalmem()/1024/1024/1024);
console.log("version:", os.version());
console.log("processor:", os.cpus());