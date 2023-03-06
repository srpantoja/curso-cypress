describe('delete transaction suite', () => {

    beforeEach(()=>{
        cy.visit("https://dev-finance.netlify.app/")

        cy.fixture('valid.transactions.json')
            .then(function (value) {
                this.fTransaction = value
            })
    })
    it('delete cash out transaction', function() {
        const transactions = [this.fTransaction[2]]

        transactions.map(
            (transaction, row) => 
                cy.add_transaction_and_save(
                    transaction.description, 
                    transaction.income, 
                    transaction.date
                )
        )
 
        transactions.map((transaction, row)=>cy.delete_data(row))

        cy.check_data_in_balance(0, '#totalDisplay')
        cy.check_data_in_balance(0, '#expenseDisplay')
    });

    it('delete cash in transaction', function()  {
        const transactions = [this.fTransaction[1]]

        transactions.map(
            (transaction, row) => 
                cy.add_transaction_and_save(
                    transaction.description, 
                    transaction.income, 
                    transaction.date
                )
        )
 
        transactions.map((transaction, row)=>cy.delete_data(row))

        cy.check_data_in_balance(0, '#totalDisplay')
        cy.check_data_in_balance(0, '#incomeDisplay')
    });

    it('delete two transaction when table have teen data', function() {
        const transactions = this.fTransaction 
        
        transactions.map((transaction, row)=> {
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })

        transactions.map((transaction, row)=>(
            transaction.description === 'cash 0' || 
            transaction.description === 'cash 5') &&
            cy.delete_data(row === 9? row - 1: row)
        )

        const transactionsAfterDelete = transactions.filter(
            (transaction, index, arr)=> (
                transaction.description !== 'cash 0' && 
                transaction.description !== 'cash 5'
            )
        )

        const balancetotal = transactionsAfterDelete.reduce((total, transaction)=> total + transaction.income, 0)
        const incomeTotal = transactionsAfterDelete.reduce((total, transaction)=> total + (transaction.income > 0 ? transaction.income: 0), 0)
        const expenseTotal = transactionsAfterDelete.reduce((total, transaction)=> total + (transaction.income < 0 ? transaction.income: 0), 0)

        cy.check_data_in_balance(balancetotal, '#totalDisplay')
        cy.check_data_in_balance(expenseTotal, '#expenseDisplay')
        cy.check_data_in_balance(incomeTotal, '#incomeDisplay')
    });

    after(()=>{
        cy.delete_all_data()
    })
})