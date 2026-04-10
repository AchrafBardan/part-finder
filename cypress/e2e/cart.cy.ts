describe('cart ', () => {
    beforeEach(() => {
        cy.visit('/')

        // set the local storage with a product in the quote list
        cy.window().then((win) => {
            win.localStorage.setItem(
                'cart',
                JSON.stringify([
                    {
                        product: {
                            "id": "2119703",
                            "name": "DAF XF 106 Front Bumper",
                            "oem": "2119703",
                            "brand": "DAF",
                            "condition": "used",
                            "price": 1200,
                            "inStock": true,
                            "category": "Body",
                            "image": "https://static.photos/automotive/400x400/111",
                            "colors": [
                                "White",
                                "Blue",
                                "Silver"
                            ]
                        },
                        color: 'White',
                        quantity: 2,
                    },
                ])
            )
        })
        cy.nuxtReady()

        cy.get('[data-cy="cart-trigger"]').click()
    })

    it('can view the quote list with added products', () => {
        cy.get('[data-cy="cart-item"]').should('have.length', 1)

        cy.get('[data-cy="cart-item"]').within(() => {
            cy.get('[data-cy="cart-item-name"]').should('contain', 'DAF XF 106 Front Bumper')
            cy.get('[data-cy="cart-item-color"]').should('contain', 'Color: White')
            cy.get('[data-cy="cart-item-quantity"]').should('contain', '2')
            cy.get('[data-cy="cart-item-price"]').should('contain', '$24.00')
        })
    })

    it('can update the quantity of a product in the quote list', () => {
        cy.get('[data-cy="cart-item"]').within(() => {
            cy.get('[data-cy="increase-quantity-button"]').click()
            cy.get('[data-cy="cart-item-quantity"]').should('contain', '3')

            cy.get('[data-cy="cart-item-price"]').should('contain', '$36.00')

            cy.get('[data-cy="decrease-quantity-button"]').click().click()
            cy.get('[data-cy="cart-item-quantity"]').should('contain', '1')
            cy.get('[data-cy="cart-item-price"]').should('contain', '$12.00')
        })
    })

    it('can remove a product from the quote list', () => {
        cy.get('[data-cy="cart-item"]').within(() => {
            cy.get('[data-cy="remove-item-button"]').click()
        })

        cy.get('[data-cy="cart-item"]').should('have.length', 0)

    })

    it('can clear the quote list', () => {
        cy.get('[data-cy="clear-cart-button"]').click()

        cy.get('[data-cy="cart-item"]').should('have.length', 0)
    })

})