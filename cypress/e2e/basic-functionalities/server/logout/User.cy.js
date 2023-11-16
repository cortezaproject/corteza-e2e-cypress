/// <reference types="cypress" />

describe('Test for logging out the user', () => {
  context('Test for logging out the logged in user', () => {
    it('should be able log out the user', () => {
      cy.get('[data-test-id="link-logout"]', { timeout: 10000 }).click({ force: true })
      cy.contains('Logout successful').should('exist')
    })
  })
})
