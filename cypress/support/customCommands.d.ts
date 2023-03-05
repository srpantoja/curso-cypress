declare namespace Cypress {
    interface Chainable<Subject> {
        add_transiction_without_save(description: any, income: any, date: any): Chainable<any>
        add_transiction_and_save(description: any, income: any, date: any): Chainable<any>
        check_data_in_table(description: any, income: any, date: any, row: any): Chainable<any>
        check_data_in_balance(income: any, element: any): Chainable<any>
        delete_data(row: any): Chainable<any>
        check_alert(expectedValue: any): Chainable<any>
  }
}