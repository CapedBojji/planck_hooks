import { useHookState } from "../topo";
import { useChange } from "./use-change";

interface Storage<T> {
    status: Promise.Status;
    value: T,
    promise: Promise<T>
}
export function useAsync<T>(
    callback: () => Promise<T>,
    dependencies: readonly unknown[],
    discriminator?: unknown,
) {
    const storage = useHookState<Storage<T>>(discriminator, (state) => {
        const promise = state.promise;
        promise.cancel();
        return false;
    });
    if (useChange(dependencies, discriminator)) {
        storage.promise.cancel();
        storage.promise = callback();
        storage.promise.andThen((value) => {
            storage.value = value;
        }, (err) => {
            storage.value = err;
        })
        storage.promise.finally(() => {
            storage.status = storage.promise.getStatus();
        })
    }
    return $tuple(storage.status, storage.value);
}
