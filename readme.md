Locker
=====================
primitive mutex for complex functions with asynchronous logic inside

# Example

## Run

```sh
npm run build
npm run example
```

## Source

```typescript
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
```

## Result

```output
waiting 0
waiting 1
waiting 2
locked 0
working 0
unlocked 0
locked 1
working 1
unlocked 1
locked 2
working 2
unlocked 2
```