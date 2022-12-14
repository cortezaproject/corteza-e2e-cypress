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
      cy.visit(composeURL + '/namespaces')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('[data-test-id="link-visit-namespace-crm"]').click({ force: true })
      cy.get('[data-test-id="input-search"]').type('Home')
      // We wait for 1s in order the search to be finished
      cy.wait(1000)
      cy.get('.nav-sidebar').contains('Home').should('exist')
    })
  })
})
