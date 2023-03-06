
describe('add transaction suite successfuly', ()=>{
    beforeEach(()=>{
        cy.visit("https://dev-finance.netlify.app/")
        cy.fixture('valid.transactions.json')
            .then(function (value) {
                this.fTransaction = value
            })
    })

    afterEach(()=>{
        cy.delete_all_data()
    })
    

    it('cash input successfuly', ()=> {
        const transaction = [this.fTransaction[0]]

        transaction.map((transaction, row)=> {
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })
        transaction.map((transaction, row)=> {
            cy.check_data_in_table(transaction.description, transaction.income, transaction.date, row)

        })
        const balancetotal = transaction.reduce((total, transaction)=> total + transaction.income, 0)
        const incomeTotal = transaction.reduce((total, transaction)=> total + (transaction.income > 0 ? transaction.income: 0), 0)
        cy.check_data_in_balance(balancetotal, '#totalDisplay')
        cy.check_data_in_balance(incomeTotal, '#incomeDisplay')

    })

    it('cash output successfuly ', ()=> {
        const transaction = [this.fTransaction[2]]

        transaction.map((transaction, row)=> {
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })
        transaction.map((transaction, row)=> {
            cy.check_data_in_table(transaction.description, transaction.income, transaction.date, row)

        })
        const balancetotal = transaction.reduce((total, transaction)=> total + transaction.income, 0)
        const expenseTotal = transaction.reduce((total, transaction)=> total + (transaction.income < 0 ? transaction.income: 0), 0)
        cy.check_data_in_balance(balancetotal, '#totalDisplay')
        cy.check_data_in_balance(expenseTotal, '#expenseDisplay')
    })

})

describe('Try to add transaction suite', () => {
    beforeEach(()=>{
        cy.visit("https://dev-finance.netlify.app/")
        cy.fixture('invalid.transactions.json')
            .then(function (value) {
                this.fTransaction = value
            })
    })

    it('try to add transaction without fill description', () => {
        const transaction = [this.fTransaction[0]]
        cy.check_alert('Por favor, preencha todos os campos corretamente')

        transaction.map((transaction, row)=> {
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })        
        
    });

    it('try to add transaction without fill value', () => {
        const transaction = [this.fTransaction[1]]

        cy.check_alert('Por favor, preencha todos os campos corretamente')
        
        transaction.map((transaction, row)=> {
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })    
    });

    it('try to add transaction without fill date', () => {
        
        const transaction = [this.fTransaction[2]]

        cy.check_alert('Por favor, preencha todos os campos corretamente')
        
        transaction.map((transaction, row)=> {
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })    
    });

    it('try to add transaction without fill fields', () => {
        const transaction = [this.fTransaction[3]]
        
        cy.check_alert('Por favor, preencha todos os campos corretamente')
        
        transaction.map((transaction, row)=> {
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        }) 
    });

    it('cancel add transaction', () => {
        const transaction = [this.fTransaction[4]]

        transaction.map((transaction, row)=> {
            cy.add_transaction_and_cancel(transaction.description, transaction.income, transaction.date)
        })
    });
});