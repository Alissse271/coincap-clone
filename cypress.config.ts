import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/coincap-clone",
    env: {
      REACT_APP_SERVICES_COINCAP_API_BASE_URL: "https://api.coincap.io/v2/assets",
    },
    // setupNodeEvents(on, config) {

    // },
  },
});
