import { useHookState } from "../topo";
import { useChange } from "./use-change";
import { useMemo } from "./use-memo";

interface Storage {
    instance?: Instance;
}

export function useInstance<T extends Instance>(creator: () => T, discriminator?: unknown): T {
    const storage = useHookState<Storage>(discriminator, (state) => {
        if (state.instance) {
            state.instance.Destroy();
        }
        return false;
    });
    const instance = useMemo(creator, [], discriminator);
    if (useChange([instance], storage)) {
        storage.instance = instance;
    }
    return storage.instance as T;
}