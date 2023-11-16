import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    HOST: 'http://localhost:3000',
    mailHogUrl: 'http://localhost:8025',
  },
  requestTimeout: 30000,
  numTestsKeptInMemory: 0,
  experimentalMemoryManagement: true,
  responseTimeout: 50000,
  pageLoadTimeout: 100000,
  watchForFileChanges: false,
  chromeWebSecurity: false,
  video: false,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  viewportWidth: 1520,
  viewportHeight: 1090,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportFilename: 'index.html',
    reportPageTitle: 'Corteza e2e tests',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    testIsolation: false,
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {},
  },
})
