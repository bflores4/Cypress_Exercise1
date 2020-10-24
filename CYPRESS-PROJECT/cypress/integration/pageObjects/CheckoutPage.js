/// <reference types="Cypress"/>

class CheckoutPage{

    isCheckoutPage()
    {
        cy.url().should('include','checkout-step-one.html')
    }

    fillFisrtName(value)
    {
        const field=cy.get('[id=first-name]')
        field.clear()
        field.type(value)
        return this
    }

    fillLastName(value)
    {
        const field=cy.get('[id=last-name]')
        field.clear()
        field.type(value)
        return this
    }

    fillPostalCode(value)
    {
        const field=cy.get('[id=postal-code]')
        field.clear()
        field.type(value)
        return this
    }

    submit()
    {
        const button= cy.get('input').contains('CONTINUE')
        button.click()
    }

    missingPostalCodeError()
    {
        const error= cy.get('h3').contains('Postal Code is required')
        error.should('be.visible')
    }

}

export default CheckoutPage