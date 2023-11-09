/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing the sidebar custom logo', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Testing the sidebar custom logo', () => {
    it('should be able to have a default logo', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]', { timeout: 10000 }).type('crm')
      // We need to visit a namespace so that the sidebar will be present
      cy.get('[data-test-id="link-visit-namespace-crm"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="img-main-logo"]').should('have.attr', 'src').should('include','attachment')
    })
  })
})
