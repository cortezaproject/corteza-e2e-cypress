/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

it('should be able to visit the page', () => {
  cy.visit(baseURL + '/')
})

it('should be able to go to the create a new account page', () => {
  cy.request(baseURL + '/auth/signup')
  cy.visit( baseURL+ '/auth/signup')
})

it('should be able to write signup credentials, create an account and log in', () => {
  cy.get('[data-test-id="input-email"]').type("cypress@test.com")
  cy.get('[data-test-id="input-password"]').type("CypressTest123$?")
  cy.get('[data-test-id="input-name"]').type("Cypress Test Account")
  cy.get('[data-test-id="input-handle"]').type("Cypress_test_account")
  cy.get('[data-test-id="button-submit"]').click()
})