describe('product ', () => {
    beforeEach(() => {
        cy.visit('/products/2119703')
        cy.nuxtReady()
    })

    it('displays everything', () => {
        cy.get('h1').should('contain', 'DAF XF 106 Front Bumper')

        // price
        cy.get('p').should('contain', '$12.00')
    })

    it('can add the product to the quote list', () => {
        cy.get('[data-cy="add-to-quote-button"]')
            .should('be.visible')
            .and('not.be.disabled')
            .click()

        cy.window().then((win) => {
            const cart = JSON.parse(win.localStorage.getItem('cart') || '[]')

            expect(cart).to.have.length(1)

            const item = cart[0];
            expect(item).to.include({
                color: 'White',
                quantity: 1,
            })

            expect(item.product).to.include({
                id: '2119703',
                name: 'DAF XF 106 Front Bumper',
                price: 1200,
            })
        })
    })

    it('can add multiple products to the quote list', () => {
        cy.get('[data-cy="increase-quantity-button"]')
            .should('be.visible')
            .and('not.be.disabled')
            .click()
            .click()

        cy.get('[data-cy="add-to-quote-button"]')
            .should('be.visible')
            .and('not.be.disabled')
            .click()

        cy.window().then((win) => {
            const cart = JSON.parse(win.localStorage.getItem('cart') || '[]')

            expect(cart).to.have.length(1)

            const item = cart[0];
            expect(item).to.include({
                color: 'White',
                quantity: 3,
            })
        })
    })

    it('can add the product to the quote list in another color', () => {

        // shadcn vue select
        cy.get('[data-cy="color-select-trigger"]').click()

        cy.get('[data-cy="color-item"]').contains('Silver').click()

        cy.get('[data-cy="add-to-quote-button"]')
            .should('be.visible')
            .and('not.be.disabled')
            .click()

        cy.window().then((win) => {
            const cart = JSON.parse(win.localStorage.getItem('cart') || '[]')

            expect(cart).to.have.length(1)

            const item = cart[0];
            expect(item).to.include({
                color: 'Silver',
                quantity: 1,
            })

            expect(item.product).to.include({
                id: '2119703',
                name: 'DAF XF 106 Front Bumper',
                price: 1200,
            })
        })
    })
})