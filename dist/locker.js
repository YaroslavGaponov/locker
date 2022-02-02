"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locker = void 0;
var Locker = /** @class */ (function () {
    function Locker(timeout) {
        if (timeout === void 0) { timeout = 30000; }
        this.timeout = timeout;
        this.resolves = [];
    }
    Locker.prototype.lock = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var timerId = setTimeout(function () { return reject(new Error('Timeout')); }, _this.timeout).unref();
            _this.resolves.push({ resolve: resolve, timerId: timerId });
            if (_this.resolves.length === 1) {
                resolve();
            }
        });
    };
    Locker.prototype.unlock = function () {
        var curr = this.resolves.shift();
        if (curr) {
            clearTimeout(curr.timerId);
        }
        var next = this.resolves[0];
        if (next) {
            process.nextTick(function () { return next.resolve(); });
        }
    };
    return Locker;
}());
exports.Locker = Locker;
//# sourceMappingURL=locker.js.map