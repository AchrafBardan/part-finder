describe('home ', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.nuxtReady()
    })

    it('displays everything', () => {
        cy.get('h1').should('contain', 'Find parts by name or OEM number')
    })

    it('displays the search experience', () => {
        cy.get('h1').should('contain', 'Find parts by name or OEM number')
        cy.get('input[placeholder="Search by part name or OEM number"]')
            .should('be.visible')
            .and('not.be.disabled')
    })

    it('can search for a specific part by OEM number and navigates to it', () => {
        cy.get('input[placeholder="Search by part name or OEM number"]')
            .should('be.visible')
            .and('not.be.disabled')
            .type('2119703')
            .type('{enter}')

        cy.url().should('include', '/products/2119703')
    })

    it('can search for a specific part by OEM number', () => {
        cy.get('input[placeholder="Search by part name or OEM number"]')
            .should('be.visible')
            .and('not.be.disabled')
            .type('2119703')

        cy.get('h3').should('contain', 'DAF XF 106 Front Bumper')

        // click on the details 
        cy.get('a').contains('Details').click()

        cy.url().should('include', '/products/2119703')
    })
})