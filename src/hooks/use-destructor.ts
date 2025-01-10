import { useHookState } from "../topo";
import { useChange } from "./use-change";

interface Storage {
    destructor?: () => void;
}
export function useDestructor(dependencies: unknown[], destructor: () => void, discriminator?: unknown): void {
    const storage = useHookState<Storage>(discriminator, (state) => {
        state.destructor?.();
        return false;
    }) 
    if (!dependencies || useChange(dependencies, storage)) {
        storage.destructor?.();
        storage.destructor = destructor;
    }
}