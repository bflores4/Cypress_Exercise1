/// <reference types="Cypress"/>

class Navbar{

    logout()
    {
        cy.get('.bm-burger-button').click()
        cy.get('#logout_sidebar_link').click()
        return this
    }

    goToCart()
    {
        const button= cy.get('#shopping_cart_container')
        button.click()
    }
}

export default Navbar
