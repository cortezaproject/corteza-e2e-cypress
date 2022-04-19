/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

it('should be able to visit the page', () => {
    cy.visit(baseURL + '/') // localhost in the env file should be changed to reflect the compose host
})

it('should be able to enter login credentials', () => {
    cy.get('[data-test-id="input-email"]').type("EMAIL") // Here in .type("Email") write your email address for your account
    cy.get('[data-test-id="input-password"]').type("PASS") // In .type("PASS") write the password for your account
})

it('should be able to login in', () => {
    cy.get('[data-test-id="button-login-and-remember"]').click()
    cy.visit(baseURL + '/compose/namespaces') // When testing things locally compose part should be removed (since compose is added in .env file)
})

// In order the tests from 2-6 to be re-run we need to delete the already create namespace from the second test
it('should delete the preexisting namespace', () => {
    cy.get('.card-footer:eq(7) > div > :eq(1)').click() // The number 7 here may vary depending on how many NS (cards) you have on your main screen (DB)
    cy.get('button:eq(10)').click().click() // Here we click on button Delete and confirming 
})