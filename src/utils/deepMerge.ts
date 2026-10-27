export function isObject(item: unknown): item is Record<string, any> {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}

export function deepMerge<T extends Record<string, any>>(
  target: T,
  source?: Record<string, any> | null
): T {
  if (!source || !isObject(source)) {
    return target;
  }

  const output = { ...target } as Record<string, any>;

  Object.keys(source).forEach((key) => {
    const targetVal = target[key];
    const sourceVal = source[key];

    if (isObject(targetVal) && isObject(sourceVal)) {
      output[key] = deepMerge(targetVal, sourceVal);
    } else if (sourceVal !== undefined) {
      output[key] = sourceVal;
    }
  });

  return output as T;
}
