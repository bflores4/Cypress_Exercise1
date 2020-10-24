/// <reference types="Cypress"/>

class InventoryPage{

    isInventoryPage()
    {
        cy.url().should('include','inventory.html')
    }
    
    addToCart(itemName)
    {
        const item= cy.get('div').contains(itemName)
        const addButton= item.parent().next().children().last()
        addButton.click()
        return this
    }
}

export default InventoryPage