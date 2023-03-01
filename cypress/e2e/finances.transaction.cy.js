
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
        cy.check_data(transiction.description, transiction.income, transiction.date)
    })

    it.skip('cash output successfuly ', ()=> {
        
    })
})