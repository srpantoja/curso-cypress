describe('list transaction suite', () => {
    
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

    it('List only cash in transaction in list', function() {
        const transactions = [this.fTransaction[0]]
        transactions.map((transaction)=>{
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })
        transactions.map((transaction, row)=>{
            cy.check_data_in_table(transaction.description, transaction.income, transaction.date, row)
        })
    });

    it('List only cash out transaction in list', function() {
        const transactions = [this.fTransaction[2]]
        transactions.map((transaction)=>{
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })
        transactions.map((transaction, row)=>{
            cy.check_data_in_table(transaction.description, transaction.income, transaction.date, row)
        })
    });


    it('List transactions with teen data', function() {
        const transactions = this.fTransaction.filter((transaction, index) => index < 10)
        transactions.map((transaction)=>{
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })
        transactions.map((transaction, row)=>{
            cy.check_data_in_table(transaction.description, transaction.income, transaction.date, row)
        })
    });

    it('List transactions with tweenty five data', function() {
        const transactions = this.fTransaction.filter((transaction, index) => index < 25)
        transactions.map((transaction)=>{
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })
        transactions.map((transaction, row)=>{
            cy.check_data_in_table(transaction.description, transaction.income, transaction.date, row)
        })
    });

    it('List transactions with fiveteen data', function() {
        const transactions = this.fTransaction.filter((transaction, index) => index < 50)
        transactions.map((transaction)=>{
            cy.add_transaction_and_save(transaction.description, transaction.income, transaction.date)
        })
        transactions.map((transaction, row)=>{
            cy.check_data_in_table(transaction.description, transaction.income, transaction.date, row)
        })
    });
});

describe('list empty transaction suite', () => {

  
    beforeEach(()=>{
        cy.visit("https://dev-finance.netlify.app/")
    })

    it('List empty data', function() {
        cy.check_empty_table()
    });


})