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
Cypress.Commands.add('add_transiction_without_save', (description, value, date)=> {
    cy.get('#transaction > .button').click()
    cy.get('#description').type(description)
    cy.get('#amount').type(value)
    cy.get('#date').type(date)
})

Cypress.Commands.add('add_transiction_and_save', (description, value, date)=> {
    cy.add_transiction_without_save(description, value, date)
    cy.contains('Salvar').click()
})

Cypress.Commands.add('check_data_in_table', (description, income, date, row)=> {
    const table = cy.get('#data-table tbody tr').eq(row)
        table.children('.description')
            .should('contain', description)

        table.parent().children(income > 0? '.income': '.expense')
            .should('contain', numberToBRL(income))

        table.parent().children('.date')
            .should('contain', dateToLocaleDate(date))

        table.parent()
            .children(':nth-child(4)')
            .children('img')
            .should('be.visible')
})

Cypress.Commands.add('check_data_in_balance', (income, element)=>{
    cy.get(element).then(($total)=> {
        const value = $total.text()
        expect(value).to.be.equal(numberToBRL(income))  
    })
})

Cypress.Commands.add('delete_data', (description)=> {
    cy.contains(description)
        .parent()
        .children(':nth-child(4)')
        .children('img')
        .click()
})

const numberToBRL = (currency) => {
    return currency.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
}

const dateToLocaleDate = (date) => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + 1)
    return newDate.toLocaleDateString()
}