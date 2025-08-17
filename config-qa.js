const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config.js");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: ".env.qa" });



const e2e = {
  baseUrl: Cypress.env('BASE_URL'),
  env: {
    USER_EMAIL: Cypress.env('USER_EMAIL'),
    USER_PASSWORD: Cypress.env('USER_PASSWORD'),
  },
};

module.exports = defineConfig({
  ...baseConfig,
  e2e,
});
