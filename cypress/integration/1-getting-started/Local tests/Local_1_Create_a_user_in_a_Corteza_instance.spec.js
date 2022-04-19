/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

it('should be able to visit the page', () => {
  cy.visit(baseURL + '/')
})

it('should be able to go to the create a new account page', () => {
  cy.request(baseURL + '/auth/signup') // When running this test make sure that the base url is set to localhost:3000
  cy.visit( baseURL+ '/auth/signup')
})

it('should be able to write signup credentials, create an account and log in', () => {
  cy.get('[data-test-id="input-email"]').type(">>TYPE EMAIL HERE<<") // On "EMAIL" we type the email of the account that we want to create
  cy.get('[data-test-id="input-password"]').type("TYPE PASSWORD HERE") // On "Password" we type the password that we want to use 
  cy.get('[data-test-id="input-name"]').type("WRITE NAME OF THE ACCOUNT") // We type the name of the account/user here
  cy.get('[data-test-id="input-handle"]').type("TYPE HANDLE FOR THE ACCOUNT") // We type the handle for the account
  cy.get('[data-test-id="button-submit"]').click() // we click on the submit button
})