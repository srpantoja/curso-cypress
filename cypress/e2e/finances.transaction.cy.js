
describe('financial transiction suite', ()=>{
    beforeEach(()=>{
        cy.visit("https://dev-finance.netlify.app/")
    })

    it.only('cash input successfuly ', ()=> {
        const transictions = [
            {
            description: 'cash input',
            income: 20,
            date: '2023-12-31'
        },
        {
            description: 'cash input 2',
            income: 320,
            date: '2023-10-25'
        }
        ]
        transictions.map((transiction, row)=> {
            cy.add_transiction_and_save(transiction.description, transiction.income, transiction.date)
        })
        transictions.map((transiction, row)=> {
            cy.check_data_in_table(transiction.description, transiction.income, transiction.date, row)

        })
        const balancetotal = transictions.reduce((total, transiction)=> total + transiction.income, 0)
        const incomeTotal = transictions.reduce((total, transiction)=> total + (transiction.income > 0 ? transiction.income: 0), 0)
        cy.check_data_in_balance(balancetotal, '#totalDisplay')
        cy.check_data_in_balance(incomeTotal, '#incomeDisplay')

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
        cy.delete_data(transiction.description)

    })
})