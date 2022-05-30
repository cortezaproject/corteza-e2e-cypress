/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

it('should be able to visit the log in page', () => {
    cy.visit(baseURL + '/') // localhost in the env file should be changed to reflect the admin host
})

it('should be able to enter login credentials', () => {
    cy.get('[data-test-id="input-email"]').type("EMAIL") // Here in .type("Email") write your email address for your account
    cy.get('[data-test-id="input-password"]').type("PASS") // In .type("PASS") write the password for your account
})

it('should be able to login in', () => {
    cy.get('[data-test-id="button-login-and-remember"]').click()
    cy.visit(baseURL + '/system/user/list') // When testing things locally the base url should be changed accordingly to match the Admin host
})

// In order the first test to be re-run we need to delete the already create user from test 1
it('should delete the preexisting user', () => {
    cy.get('.text-right>:eq(6)').click() // The number 6 here may vary depending how may users are there
    cy.get('button:eq(6)').click().click() // Here we click on the delete icon
})