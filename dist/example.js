"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
function timeout(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}
const locker = new _1.Locker();
async function runme(i) {
    try {
        console.log(`waiting ${i}`);
        await locker.lock();
        console.log(`locked ${i}`);
        await timeout(1000);
        console.log(`working ${i}`);
        await timeout(1000);
    }
    finally {
        console.log(`unlocked ${i}`);
        locker.unlock();
        console.log(`done ${i}`);
    }
}
for (let i = 0; i < 3; i++) {
    runme(i);
}
//# sourceMappingURL=example.js.map