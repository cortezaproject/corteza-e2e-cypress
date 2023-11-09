/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing the sidebar default logo', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Testing the sidebar default logo', () => {
    it('should be able to see the default logo', () => {
      cy.visit(adminURL + '/')
      cy.get('[data-test-id="img-main-logo"]', { timeout: 10000 }).should('have.attr', 'src').should('include','assets')
    })
  })
})
