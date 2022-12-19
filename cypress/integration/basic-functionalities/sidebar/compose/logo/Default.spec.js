/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing the sidebar default logo', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Testing the sidebar default logo', () => {
    it('should be able to see the default logo', () => {
      cy.visit(composeURL + '/namespaces')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('[data-test-id="input-search"]').type('crm')
      // We wait for 1s in order the search to be finished
      cy.wait(1000)
      // We need to visit a namespace so that the sidebar will be present
      cy.get('[data-test-id="link-visit-namespace-crm"]').click({ force: true })
      cy.get('[data-test-id="img-main-logo"]').should('have.attr', 'src').should('include','assets')
    })
  })
})
