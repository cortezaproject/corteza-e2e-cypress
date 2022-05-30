/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

it('should be able to visit the log in page', () => {
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


it('should be able to create a new namespace', () => {
    cy.get('[data-test-id="button-create"]').click()
    cy.get('[data-test-id="input-name"]').type("NAME")    // in .type("Name") write the name of your namespace
    cy.get('[data-test-id="input-slug"]').type("HANDLE")  // in .type("handle") write the short name/handle of your namespace
    cy.get('[data-test-id="button-save-and-close"]').click()
})