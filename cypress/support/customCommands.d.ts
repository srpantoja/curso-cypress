declare namespace Cypress {
    interface Chainable<Subject> {
        add_transaction_without_save(description: any, income: any, date: any): Chainable<any>
        add_transaction_and_save(description: any, income: any, date: any): Chainable<any>
        add_transaction_and_cancel(description: any, income: any, date: any): Chainable<any>
        check_data_in_table(description: any, income: any, date: any, row: any): Chainable<any>
        check_empty_table(): Chainable<any>
        check_data_in_balance(income: any, element: any): Chainable<any>
        delete_data(row: any): Chainable<any>
        delete_all_data(): Chainable<any>
        check_alert(expectedValue: any): Chainable<any>
  }
}