/// <reference types="Cypress"/>

class CartPage{

    isCartPage()
    {
        cy.url().should('include','cart.html')
    }

    continueShopping()
    {
        const button = cy.get('a').contains('Continue Shopping')
        button.click()
    }

    itemIsInCart(itemName)
    {
        const item = cy.get('div').contains(itemName).should('be.visible')
        return this
    }
    
    checkout()
    {
        const button= cy.get('.checkout_button')
        button.click()
    }    
    
}

export default CartPage