import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    // Playwright owns e2e/*.spec.ts; Vitest only runs unit/component tests.
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
