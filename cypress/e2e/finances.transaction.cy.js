
describe('financial transiction suite', ()=>{
    beforeEach(()=>{
        cy.visit("https://dev-finance.netlify.app/")
    })

    it('cash input successfuly', ()=> {
        const transictions = [
            {
                description: 'cash input',
                income: 20,
                date: '2023-12-31'
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
        const transictions = [{
            description: 'cash output',
            income: -120,
            date: '2023-05-25'
        }]
        transictions.map((transiction, row)=> {
            cy.add_transiction_and_save(transiction.description, transiction.income, transiction.date)
        })
        transictions.map((transiction, row)=> {
            cy.check_data_in_table(transiction.description, transiction.income, transiction.date, row)

        })
        const balancetotal = transictions.reduce((total, transiction)=> total + transiction.income, 0)
        const expenseTotal = transictions.reduce((total, transiction)=> total + (transiction.income < 0 ? transiction.income: 0), 0)
        cy.check_data_in_balance(balancetotal, '#totalDisplay')
        cy.check_data_in_balance(expenseTotal, '#expenseDisplay')
        transictions.map((transiction, row)=> {
            cy.delete_data(row)
        })
    })

    it('try to add transaction without fill description', () => {
        const transictions = [{
            description: null,
            income: -120,
            date: '2023-05-25'
        }]
        cy.check_alert('Por favor, preencha todos os campos corretamente')

        transictions.map((transiction, row)=> {
            cy.add_transiction_and_save(transiction.description, transiction.income, transiction.date)
        })        
        
    });

    it('try to add transaction without fill value', () => {
        const transictions = [{
            description: 'without fill value',
            income: null,
            date: '2023-05-25'
        }]
        cy.check_alert('Por favor, preencha todos os campos corretamente')
        
        transictions.map((transiction, row)=> {
            cy.add_transiction_and_save(transiction.description, transiction.income, transiction.date)
        })    
    });

    it('try to add transaction without fill date', () => {
        
        const transictions = [{
            description: 'without fill date',
            income: 20,
            date: null
        }]
        
        cy.check_alert('Por favor, preencha todos os campos corretamente')
        
        transictions.map((transiction, row)=> {
            cy.add_transiction_and_save(transiction.description, transiction.income, transiction.date)
        })    
    });

    it('try to add transaction without fill fields', () => {
        const transictions = [{
            description: null,
            income: null,
            date: null
        }]
        
        cy.check_alert('Por favor, preencha todos os campos corretamente')
        
        transictions.map((transiction, row)=> {
            cy.add_transiction_and_save(transiction.description, transiction.income, transiction.date)
        }) 
    });

    it('cancel add transaction', () => {
        const transictions = [
            {
                description: 'cash input',
                income: 20,
                date: '2023-12-31'
            }
        ]
        transictions.map((transiction, row)=> {
            cy.add_transiction_and_cancel(transiction.description, transiction.income, transiction.date)
        })
    });
})