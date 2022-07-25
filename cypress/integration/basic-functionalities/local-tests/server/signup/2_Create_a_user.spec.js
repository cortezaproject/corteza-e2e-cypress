/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for creating a user', () => {
  context('Test for creating a user in corteza', () => {
    it('should be able to write signup credentials, create an account and log in', () => {
      // When running this test make sure that the base url is set to localhost:3000
      cy.visit(baseURL + '/') 
      cy.get('[data-test-id="link-signup"]').click()
      cy.get('[data-test-id="input-email"]').type(email)
      cy.get('[data-test-id="input-password"]').type(password)
      cy.get('[data-test-id="input-name"]').type('Cypress test account')
      cy.get('[data-test-id="input-handle"]').type('cypress_test_account')
      cy.get('[data-test-id="button-submit"]').click()
      // We check if the success toast appears
      cy.get('.border-primary') 
    })
  })
})
