export function dummyPromise<T>(): Promise<T> {
    return new Promise(() => { });
}