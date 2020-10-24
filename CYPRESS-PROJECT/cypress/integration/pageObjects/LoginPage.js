/// <reference types="Cypress"/>

class LoginPage
{   
    visit()
    {
        cy.visit("https://www.saucedemo.com/index.html")
    }

    isLoginPage()
    {
        cy.url().should('include','index.html')
    }

    fillUsername(value)
    {
        const field=cy.get('[id=user-name]')
        field.clear()
        field.type(value)
        return this
    }

    fillPassword(value)
    {
        const field=cy.get('[id=password]')
        field.clear()
        field.type(value)
        return this
    }

    invaliUserError()
    { 
        const error= cy.get('h3').contains('Username and password do not match any user in this service')
        error.should('be.visible')
    }

    submit()
    {
        const button= cy.get('[id=login-button]')
        button.click()
    }
}

export default LoginPage