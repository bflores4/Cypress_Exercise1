describe('Logi with Fixtures Data', () => {
    it('login', () => {
        cy.visit('https://www.saucedemo.com/', {timeout: 10000}) 
        cy.url().should('include','saucedemo') 

        cy.fixture('userChallenge').then(user => {
            const invalidUsername = user.invalidUsername
            const invalidPassword = user.invalidPassword

            cy.get('#user-name').clear()
            cy.get('#user-name').type(invalidUsername)

            cy.get('#password').clear()
            cy.get('#password').type(invalidPassword)

            cy.get('#login-button').click()
            cy.pause()
        })


        cy.fixture('userChallenge').then(user => {
            const username = user.username
            const password = user.password

            cy.get('#user-name').clear()
            cy.get('#user-name').type(username)

            cy.get('#password').clear()
            cy.get('#password').type(password)
        })
        cy.get('#login-button').click()
        cy.url().should('include','inventory.html')
    });
});