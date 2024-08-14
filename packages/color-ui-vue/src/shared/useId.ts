let count = 0;

/**
 * The `useId` function generates a unique identifier using a provided deterministic ID or a default
 * @param {string | null | undefined} [deterministicId] - The `useId` function you provided takes an
 * optional parameter `deterministicId`, which can be a string, null, or undefined. If
 * `deterministicId` is provided, the function will return it. Otherwise, it will generate an id using
 * the `useId` function obtained
 * @returns The `useId` function is being returned. If a `deterministicId` is provided, it will be
 * returned.
 */
export function useId(deterministicId?: string | null | undefined, prefix = "color-ui") {
  if (deterministicId) return deterministicId;

  return `${prefix}-${++count}`;
}
