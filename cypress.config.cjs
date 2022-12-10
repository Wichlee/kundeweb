// https://docs.cypress.io/guides/references/configuration

const { defineConfig } = require('cypress'); // eslint-disable-line @typescript-eslint/unbound-method, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://localhost:4200',
        specPattern: ['cypress/e2e/*.cy.js'],
        supportFile: false,
    },
    viewportWidth: 1200,
    viewportHeight: 800,
    videoCompression: false,
    // default: 4000 ms
    defaultCommandTimeout: 9999,
});
