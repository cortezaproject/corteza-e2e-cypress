/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password
const newPassword = Cypress.env('user').newPassword

describe('Test for logging out the user', () => {
  before(() => {
    cy.login({ email, password: newPassword, buttonLoginID: 'button-login-and-remember' })
    cy.get('.border-primary') // We check if the success toast appears
  })

  context('Test for logging out the logged in user', () => {
    it('should be able log out the user', () => {
      cy.get('[data-test-id="link-logout"]').click()
      cy.get('[data-test-id="message-logout-successful"]')
    })
  })
})
