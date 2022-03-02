/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

it('should be able to visit the page', () => {
    cy.visit(baseURL + '/')
})

it('should be able to go to the create a new account page', () => {
    cy.get(':nth-child(2) > a').click()
})

it('should be able to write signup credentials', () => {
    cy.visit(baseURL + '/')
    cy.get(':nth-child(2) > a').click()
    cy.get(':nth-child(2) > .form-control').type("cypress@test.com")
    cy.get(':nth-child(3) > .form-control').type("CypressTest123$?")
    cy.get(':nth-child(4) > .form-control').type("Cypress Test Account")
    cy.get(':nth-child(5) > .form-control').type("Cypress_test_account")

    // "clicks" (submit) should be inside the same test!
    cy.get('#submit').click()
})

// it('should be able create the account', () => {
//     cy.request(baseURL + '/auth/signup')
// })
