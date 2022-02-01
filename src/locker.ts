interface ResolveElement {
    resolve: (value?: any) => void;
    timerId: NodeJS.Timeout;
}

export class Locker {

    private readonly resolves: ResolveElement[] = [];

    constructor(private readonly timeout: number = 30000) { }

    lock(): Promise<void> {
        return new Promise((resolve, reject) => {
            const timerId = setTimeout(() => reject(new Error('Timeout')), this.timeout).unref();
            this.resolves.push({ resolve, timerId });
            if (this.resolves.length === 1) {
                resolve();
            }
        });
    }

    unlock(): void {
        const curr = this.resolves.shift();
        if (curr) {
            clearTimeout(curr.timerId);
        }
        const next = this.resolves[0];
        if (next) {
            next.resolve();
        }
    }
}