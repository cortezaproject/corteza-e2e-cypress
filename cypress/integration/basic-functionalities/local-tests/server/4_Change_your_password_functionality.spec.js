/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const password = Cypress.env('user').password
const updatedPassword = Cypress.env('user').updatedPassword

describe('Test for checking the change password functionality', () => {
  before(() => {
    cy.login()
  })
  
  context('Test for changing the password of the user', () => {
    it('should be able to change the password of the user', () => {
      cy.visit(baseURL + '/auth') // When running this test make sure that the base url is set to localhost:3000
      cy.get('[data-test-id="link-tab-security"]').click()
      cy.get('[data-test-id="link-change-password"]').click()
      cy.get('[data-test-id="input-old-password"]').type(password)
      cy.get('[data-test-id="input-new-password"]').type(updatedPassword)
      cy.get('[data-test-id="button-change-password"]').click()
    })
  })
})
