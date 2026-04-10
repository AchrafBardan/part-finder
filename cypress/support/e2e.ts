// Loaded automatically before test files.

declare global {
    namespace Cypress {
        interface Chainable {
            nuxtReady(): Chainable<void>;
        }
    }
}

Cypress.Commands.add('nuxtReady', () => {
    cy.window().should((win) => {
        const nuxtWindow = win as typeof win & {
            useNuxtApp: () => { isHydrating: boolean };
        };

        expect(nuxtWindow.useNuxtApp().isHydrating).to.eq(false);
    });
})

export { };
