/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

describe('Test for logging out the user', () => {
  before(() => {
    cy.login({ changePassword: true })
  })

  context('Test for logging out the logged in user', () => {
    it('should be able log out the user', () => {
      cy.get('[data-test-id="link-logout"]').click()
    })
  })
})
