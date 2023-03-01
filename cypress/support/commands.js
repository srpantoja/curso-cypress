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
    cy.contains('button', 'Salvar').click()
})

Cypress.Commands.add('check_data', (description, income, date)=> {
    const table = cy.get('#data-table tbody tr')
        table.get('.description').then(($description)=> {
            const value = $description.text()
            expect(value).to.be.equal(description)
        })

        table.get('.income').then(($income)=> {
            const value = $income.text()
            const currency = income.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
            expect(value).to.be.equal(currency)
        })

        table.get('.date').then(($date)=> {
            const value = $date.text()
            const newDate = new Date(date)
            newDate.setDate(newDate.getDate() + 1)
            expect(value).to.be.contain(newDate.toLocaleDateString())
        })
})