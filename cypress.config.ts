import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    video: false,
    screenshotsFolder: "cypress/screenshots",
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 8000,
    setupNodeEvents(on) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "electron") {
          launchOptions.preferences.width = 1600;
          launchOptions.preferences.height = 1000;
        }

        return launchOptions;
      });
    },
  },
});

