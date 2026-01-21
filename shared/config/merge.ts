export function mergeWithDefaults<T>(
    defaults: T,
    data: Partial<T>
): T {
    const result = structuredClone(defaults);

    for (const key in data) {
        if (
            typeof data[key] === "object" &&
            data[key] !== null &&
            !Array.isArray(data[key])
        ) {
            result[key] = mergeWithDefaults(
                defaults[key],
                data[key]
            );
        } else {
            result[key] = data[key] as T[Extract<keyof T, string>];
        }
    }

    return result;
}
