import { defineConfig } from "cypress";
import getCompareSnapshotsPlugin from "cypress-visual-regression/dist/plugin";

export default defineConfig({
  env: {
    screenshotsFolder: "./cypress/snapshots/actual",
    trashAssetsBeforeRuns: true,
    video: false,
  },
  e2e: {
    baseUrl: "http://localhost:3000/coincap-clone",
    env: {
      REACT_APP_SERVICES_COINCAP_API_BASE_URL: "https://api.coincap.io/v2/assets",
    },
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config);
    },
  },
});
