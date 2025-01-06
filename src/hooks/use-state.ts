import { useHookState } from "../topo";


interface Storage<T extends unknown[]> {
    value?: [T];
}

export function useState<T extends unknown[]>(value: T, discriminator?: unknown) {
    const storage = useHookState<Storage<T>>(discriminator);

    if (storage.value === undefined) {
        storage.value = [value];
    }

    const setter = (newValue: T | ((oldValue: T) => T)) => {
        const value = storage.value![0];
        if (typeIs(newValue, "function"))
            newValue = newValue(value);
        storage.value = [newValue];
    }

    return $tuple(storage.value[0], setter);
}