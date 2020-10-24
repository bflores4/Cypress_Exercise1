/// <reference types="Cypress"/>


class CheckoutTwoPage{

    isCheckoutTwoPage()
    {
        cy.url().should('include','checkout-step-two.html')
    }
    
    checkItem(itemName)
    {
        const item = cy.get('div').contains(itemName).should('be.visible')
        return this
    }

    finalisePurchase()
    {
        const button= cy.get('a').contains('FINISH')
        button.click()
        cy.url().should('include','checkout-complete.html')
    }


}

export default CheckoutTwoPage