/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

describe('Test for creating a user with misconfigured email', () => {
  context('Test for entering the sign up information', () => {
    it('should not be able to create an account due to a misconfigured email', () => {
      cy.visit(baseURL + '/') // When running this test make sure that the base url is set to localhost:3000
      cy.get('[data-test-id="link-signup"]').click()

      cy.get('[data-test-id="input-email"]').type('cypress_email') // THIS WILL BE LEFT LIKE THIS SO IT'S MISCONFIGURED AND WE RECEIVE AN ERROR/WARNING
      cy.get('[data-test-id="input-password"]').type('password')
      cy.get('[data-test-id="input-name"]').type('cypress account')
      cy.get('[data-test-id="input-handle"]').type('cypress_handle')
      cy.get('[data-test-id="button-submit"]').click()
    })
  })
})
