export function mergeWithDefaults<T>(
    defaults: T,
    partial?: Partial<T>
): T {
    if (!partial) return structuredClone(defaults);

    const result: any = structuredClone(defaults);

    for (const key in partial) {
        if (
            typeof partial[key] === "object" &&
            partial[key] !== null &&
            !Array.isArray(partial[key])
        ) {
            result[key] = mergeWithDefaults(
                (defaults as any)[key],
                partial[key] as any
            );
        } else {
            result[key] = partial[key];
        }
    }

    return result;
}

