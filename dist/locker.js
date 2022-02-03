"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locker = void 0;
const nextTick = (_a = process === null || process === void 0 ? void 0 : process.nextTick) !== null && _a !== void 0 ? _a : setImmediate;
class Locker {
    constructor(timeout = 30000) {
        this.timeout = timeout;
        this.resolves = [];
    }
    lock() {
        return new Promise((resolve, reject) => {
            const timerId = setTimeout(() => reject(new Error('Timeout')), this.timeout).unref();
            this.resolves.push({ resolve, timerId });
            if (this.resolves.length === 1) {
                resolve();
            }
        });
    }
    unlock() {
        const curr = this.resolves.shift();
        if (curr) {
            clearTimeout(curr.timerId);
        }
        const next = this.resolves[0];
        if (next) {
            nextTick(() => next.resolve());
        }
    }
}
exports.Locker = Locker;
//# sourceMappingURL=locker.js.map