
describe('financial transiction suite', ()=>{
    beforeEach(()=>{
        cy.visit("https://dev-finance.netlify.app/")

    })

    it('cash input successfuly ', ()=> {
        const transiction = {
            description: 'cash input',
            income: 20,
            date: '2023-12-31'
        }
        cy.add_transiction_and_save(transiction.description, transiction.income, transiction.date)
        cy.check_data_in_table(transiction.description, transiction.income, transiction.date)
        cy.check_data_in_balance(transiction.income, '#totalDisplay')
        cy.check_data_in_balance(transiction.income, '#incomeDisplay')

    })

    it('cash output successfuly ', ()=> {
        const transiction = {
            description: 'cash output',
            income: -120,
            date: '2023-05-25'
        }
        cy.add_transiction_and_save(transiction.description, transiction.income, transiction.date)
        cy.check_data_in_table(transiction.description, transiction.income, transiction.date)
        cy.check_data_in_balance(transiction.income, '#totalDisplay')
        cy.check_data_in_balance(transiction.income, '#expenseDisplay')
    })
})