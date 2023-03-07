// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('add_transaction_without_save', (description, income, date)=> {
    cy.get('#transaction > .button').click()
    description !== null && cy.get('#description').type(description)
    income !== null && cy.get('#amount').type(income)
    date !== null && cy.get('#date').type(date)
})

Cypress.Commands.add('add_transaction_and_save', (description, income, date)=> {
    cy.add_transaction_without_save(description, income, date)
    cy.contains('Salvar').click()
})

Cypress.Commands.add('add_transaction_and_cancel', (description, income, date)=> {
    cy.add_transaction_without_save(description, income, date)
    cy.contains('Cancel')
        .click()
    cy.get('.modal').parent()
        .should('not.be.visible')

})
Cypress.Commands.add('check_data_in_table', (description, income, date, row)=> {
    const table = cy.get('#data-table tbody tr').eq(row)
        
        table.children('.description')
            .should('contain', description)
            .parent()

        table.children(income > 0? '.income': '.expense')
            .should('contain', numberToBRL(income))
            .parent()

        table.children('.date')
            .should('contain', dateToLocaleDate(date))
            .parent()

        table.children(':nth-child(4)')
            .children('img')
            .should('be.visible')
})

Cypress.Commands.add('check_empty_table', ()=> {
    cy.get('#data-table tbody tr')
        .should('have.length', 0)
})

Cypress.Commands.add('check_data_in_balance', (income, element)=>{
    cy.get(element).should('contain', numberToBRL(income))
})

Cypress.Commands.add('delete_data', (row)=> {
    cy.get('#data-table tbody tr')
        .eq(row)
        .children(':nth-child(4)')
        .children('img')
        .click()
})

Cypress.Commands.add('delete_all_data', ()=> {
    cy.get('#data-table tbody tr').then(($element) => {
        if($element.length > 0 ) 
            for(let i = $element.length -1; i >= 0 ; i--)
                cy.delete_data(i)
    })

})

Cypress.Commands.add('check_alert', (expectedValue)=>{
    cy.on('window:alert',(alert)=>{
        expect(alert).to.contains(expectedValue)
     })
})

const numberToBRL = (currency) => {
    return currency.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
}

const dateToLocaleDate = (date) => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + 1)
    return newDate.toLocaleDateString()
}