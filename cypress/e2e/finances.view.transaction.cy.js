describe('view amount suite', function(){

    beforeEach(()=>{
        cy.visit("https://dev-finance.netlify.app/")

        cy.fixture('more.transactions.json')
            .then(function (value) {
                this.fTransaction = value
            })
    })

    afterEach(()=>{
        cy.delete_all_data()
    })
    
    it('View amount with one positive transaction', function(){
        const transaction = [this.fTransaction[0]]

        transaction.map((transaction, row)=> {
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })
        transaction.map((transaction, row)=> {
            cy.check_data_in_table(transaction.description, transaction.income, transaction.date, row)

        })
        const balancetotal = transaction.reduce((total, transaction)=> total + transaction.income, 0)
        const incomeTotal = transaction.reduce((total, transaction)=> total + (transaction.income > 0 ? transaction.income: 0), 0)
        const expenseTotal = transaction.reduce((total, transaction)=> total + (transaction.income < 0 ? transaction.income: 0), 0)
        cy.check_data_in_balance(balancetotal, '#totalDisplay')
        cy.check_data_in_balance(incomeTotal, '#incomeDisplay')
        cy.check_data_in_balance(expenseTotal, '#expenseDisplay')

    });

    it('View amount with one negative transaction', function(){
        const transaction = [this.fTransaction[2]]

        transaction.map((transaction, row)=> {
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })
        transaction.map((transaction, row)=> {
            cy.check_data_in_table(transaction.description, transaction.income, transaction.date, row)

        })
        const balancetotal = transaction.reduce((total, transaction)=> total + transaction.income, 0)
        const incomeTotal = transaction.reduce((total, transaction)=> total + (transaction.income > 0 ? transaction.income: 0), 0)
        const expenseTotal = transaction.reduce((total, transaction)=> total + (transaction.income < 0 ? transaction.income: 0), 0)

        cy.check_data_in_balance(balancetotal, '#totalDisplay')
        cy.check_data_in_balance(incomeTotal, '#incomeDisplay')
        cy.check_data_in_balance(expenseTotal, '#expenseDisplay')

    });
    it('View amount with five transaction', function(){
        const transaction = this.fTransaction.filter((transaction, index) => index < 10)

        transaction.map((transaction, row)=> {
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })
        transaction.map((transaction, row)=> {
            cy.check_data_in_table(transaction.description, transaction.income, transaction.date, row)

        })
        const balancetotal = transaction.reduce((total, transaction)=> total + transaction.income, 0)
        const incomeTotal = transaction.reduce((total, transaction)=> total + (transaction.income > 0 ? transaction.income: 0), 0)
        const expenseTotal = transaction.reduce((total, transaction)=> total + (transaction.income < 0 ? transaction.income: 0), 0)

        cy.check_data_in_balance(balancetotal, '#totalDisplay')
        cy.check_data_in_balance(incomeTotal, '#incomeDisplay')
        cy.check_data_in_balance(expenseTotal, '#expenseDisplay')
    });
    it('View amount with tweenty five transaction ', function(){
        const transaction = this.fTransaction.filter((transaction, index) => index < 25)

        transaction.map((transaction, row)=> {
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })
        transaction.map((transaction, row)=> {
            cy.check_data_in_table(transaction.description, transaction.income, transaction.date, row)

        })
        const balancetotal = transaction.reduce((total, transaction)=> total + transaction.income, 0)
        const incomeTotal = transaction.reduce((total, transaction)=> total + (transaction.income > 0 ? transaction.income: 0), 0)
        const expenseTotal = transaction.reduce((total, transaction)=> total + (transaction.income < 0 ? transaction.income: 0), 0)

        cy.check_data_in_balance(balancetotal, '#totalDisplay')
        cy.check_data_in_balance(incomeTotal, '#incomeDisplay')
        cy.check_data_in_balance(expenseTotal, '#expenseDisplay')
    });
    it('View amount with fiveteen transaction ', function(){
        const transaction = this.fTransaction.filter((transaction, index) => index < 50)

        transaction.map((transaction, row)=> {
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })
        transaction.map((transaction, row)=> {
            cy.check_data_in_table(transaction.description, transaction.income, transaction.date, row)

        })
        const balancetotal = transaction.reduce((total, transaction)=> total + transaction.income, 0)
        const incomeTotal = transaction.reduce((total, transaction)=> total + (transaction.income > 0 ? transaction.income: 0), 0)
        const expenseTotal = transaction.reduce((total, transaction)=> total + (transaction.income < 0 ? transaction.income: 0), 0)

        cy.check_data_in_balance(balancetotal, '#totalDisplay')
        cy.check_data_in_balance(incomeTotal, '#incomeDisplay')
        cy.check_data_in_balance(expenseTotal, '#expenseDisplay')
    });
});

describe('view empty amount suite', function(){
    beforeEach(()=>{
        cy.visit("https://dev-finance.netlify.app/")
    })
    it('view amount with empty transaction', function(){
        cy.check_empty_table()
        cy.check_data_in_balance(0, '#totalDisplay')
        cy.check_data_in_balance(0, '#incomeDisplay')
        cy.check_data_in_balance(0, '#expenseDisplay')
    });
});