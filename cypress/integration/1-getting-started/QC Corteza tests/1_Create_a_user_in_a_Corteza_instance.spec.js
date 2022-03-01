/// <reference types="cypress" />

it('should be able to create a new user in corteza', () => {

    cy.visit('https://qc.cortezaproject.org/auth/login')
    cy.get(':nth-child(2) > a').click()
    cy.get(':nth-child(2) > .form-control').type("cypress@test.com") // in .type("EMAIL") write any email that you want to create
    cy.get(':nth-child(3) > .form-control').type("Cypress123$?") // in .type("PASSWORD") write any password that you want to have for the account
    cy.get(':nth-child(4) > .form-control').type("Cypress Test") // Write your full name in the type("FULL NAME")
    cy.get(':nth-child(5) > .form-control').type("Cypress_test") // Write your short name or handle in the type("HANDLE")
    cy.get('#submit').click()
// The user is created(Check with another superadmin account, in admin->users)but the email needs to be verified so you can log in and use the account

})
