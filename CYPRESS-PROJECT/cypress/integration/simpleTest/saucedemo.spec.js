/// <reference types="Cypress"/>

import Navbar from '../pageObjects/Navbar'
import LoginPage from '../pageObjects/LoginPage'
import InventoryPage from '../pageObjects/InventoryPage'
import CartPage from '../pageObjects/CartPage'
import CheckoutPage from '../pageObjects/CheckoutPage';
import CheckoutTwoPage from '../pageObjects/CheckoutTwoPage';

describe('Test', () => {

    it('login with an invalid user', () => {
        const lp=new LoginPage()

        lp.visit()
        lp.isLoginPage()

        cy.fixture('userChallenge').then(user => {
            const invalidUsername = user.invalidUsername
            const invalidPassword = user.invalidPassword

            lp.fillUsername(invalidUsername)
            lp.fillPassword(invalidPassword)
        })
        
        lp.submit()
        cy.get('[data-test="error"]').should('be.visible')
    });

    it('Login with a valid user', () => {
        const lp=new LoginPage()
        const ip=new InventoryPage()

        lp.visit()

        cy.fixture('userChallenge').then(user => {
            const username = user.username
            const password = user.password

            lp.fillUsername(username)
            lp.fillPassword(password)
        })
        
        lp.submit()
        ip.isInventoryPage()
    });

    it('Logout from product’s page', () => {
        const nb=new Navbar().logout()
        const lp=new LoginPage().isLoginPage()
    }); 

    it('Navigate to the shopping cart', () => {
        const lp=new LoginPage()
        const ip=new InventoryPage()

        lp.visit()

        cy.fixture('userChallenge').then(user => {
            const username = user.username
            const password = user.password

            lp.fillUsername(username)
            lp.fillPassword(password)
        })
        
        lp.submit()
        ip.isInventoryPage()
        
        const nav = new Navbar().goToCart()
        const cp = new CartPage().isCartPage()
    });

    it('Add a single item to the shopping cart', () => {
        const cp = new CartPage()
        const ip=new InventoryPage()
        const nav = new Navbar()

        cp.continueShopping()
        ip.isInventoryPage()

        cy.fixture('wishList').then(wishList => {
            const itemOne = wishList.itemOne
            ip.addToCart(itemOne)

            nav.goToCart()
            cp.isCartPage()

            cp.itemIsInCart(itemOne)
        })
    });

    it('Add multiple items to the shopping cart', () => {
        const cp = new CartPage()
        const ip=new InventoryPage()
        const nav = new Navbar()

        cp.continueShopping()
        ip.isInventoryPage()

        cy.fixture('wishList').then(wishList => {
            const itemTwo = wishList.itemTwo
            const itemThree = wishList.itemThree
            
            ip.addToCart(itemTwo)
            ip.addToCart(itemThree)

            nav.goToCart()
            cp.isCartPage()

            cp.itemIsInCart(itemTwo)
            cp.itemIsInCart(itemThree)
        })
    });

    it('Continue with missing mail information', () => {
        const cp = new CartPage()
        const chp = new CheckoutPage()

        cp.checkout()
        chp.isCheckoutPage()

        cy.fixture('userChallenge').then(user => {
            const firstName = user.firstName
            const lastName = user.lastName

            chp.fillFisrtName(firstName)
            chp.fillLastName(lastName)
        })
        chp.submit()
        chp.missingPostalCodeError()
    });

    it('Fill user’s information', () => {
        const chp = new CheckoutPage()
        const chpTwo = new CheckoutTwoPage()
        cy.fixture('userChallenge').then(user => {
            const postalCode = user.postalCode
            
            chp.fillPostalCode(postalCode)
        })
        chp.submit()
        chpTwo.isCheckoutTwoPage()
    });

    it('Final order items', () => {
        const chpTwo = new CheckoutTwoPage()

        cy.fixture('wishList').then(wishList => {
            const itemOne = wishList.itemOne
            const itemTwo = wishList.itemTwo
            const itemThree = wishList.itemThree

            chpTwo.checkItem(itemOne)
            chpTwo.checkItem(itemTwo)
            chpTwo.checkItem(itemThree)
        })
        
    });

    it('Complete a purchase', () => {
        const chpTwo = new CheckoutTwoPage()
        chpTwo.finalisePurchase()
    });
});