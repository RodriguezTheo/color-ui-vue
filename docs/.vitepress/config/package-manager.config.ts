export const PACKAGE_MANAGERS_ALLOWED = ["npm", "yarn", "pnpm", "bun"] as const;

export const PACKAGE_MANAGERS = {
  NPM: "npm",
  YARN: "yarn",
  PNPM: "pnpm",
  BUN: "bun"
} as const;
