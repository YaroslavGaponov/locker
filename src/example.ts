import { Locker } from ".";

function timeout(time: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

const locker = new Locker();

async function runme(i: number) {
    try {
        console.log(`waiting ${i}`);
        await locker.lock();
        console.log(`locked ${i}`);
        await timeout(1000);
        console.log(`working ${i}`);
        await timeout(1000);
    } finally {
        console.log(`unlocked ${i}`);
        locker.unlock();
    }
}

for (let i = 0; i < 3; i++) {
    runme(i);
}