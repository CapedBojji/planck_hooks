import { useMemo } from "./use-memo";


export function useInstance<T extends Instance>(creator: () => T, discriminator?: unknown): T {
    return useMemo(creator, [], discriminator);
}