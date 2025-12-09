import { defineConfig } from "@playwright/test";
import NativeTextReporter from "./reporter/native-text-reporter";

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  retries: 1,
  reporter: [["line"], [NativeTextReporter]],
  use: {
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  workers: 4
});
