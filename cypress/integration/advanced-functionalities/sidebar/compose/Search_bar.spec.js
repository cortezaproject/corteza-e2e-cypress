/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for compose sidebar search functionality', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test for compose sidebar search functionality', () => {
    it('should be able to search for pages', () => {
      cy.intercept('/api/compose/namespace/').as('namespace-list')
      cy.visit(composeURL + '/namespaces')
      cy.wait('@namespace-list')
      cy.get('[data-test-id="link-visit-namespace-crm"]').click({ force: true })
      cy.get('[data-test-id="input-search"]', { timeout: 10000 }).type('Home')
      cy.get('.nav-sidebar').contains('Home').should('exist')
    })
  })
})
