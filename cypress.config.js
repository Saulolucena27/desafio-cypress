import { defineConfig } from "cypress";
import cucumber from "cypress-cucumber-preprocessor";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    video: true,
    videoUploadOnPasses: true,
    videoCompression: 32,
    viewportHeight: 1920,
    viewportWidth: 1080,
    watchForFileChanges: false,
    specPattern: "cypress/e2e/**/*.feature",
    baseUrl: process.env.BASE_URL,
    env: {
      USER_EMAIL: process.env.USER_EMAIL,
      USER_PASSWORD: process.env.USER_PASSWORD,
    },
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber.default());
      return config;
    },
  },

  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,
});
