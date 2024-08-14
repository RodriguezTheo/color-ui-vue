export function makeTriggerId(baseId: string, value: string | number) {
  return `${baseId}-mode-trigger-${value}`;
}

export function makeContentId(baseId: string, value: string | number) {
  return `${baseId}-mode-content-${value}`;
}
