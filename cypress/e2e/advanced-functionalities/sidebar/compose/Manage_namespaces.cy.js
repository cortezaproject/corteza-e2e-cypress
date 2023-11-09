/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for compose sidebar manage namespaces button functionality', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test for compose sidebar manage namespaces button functionality', () => {
    it('should be able to click on manage namespaces and be redirected', () => {
      cy.intercept('/api/compose/namespace/').as('namespace-list')
      cy.visit(composeURL + '/namespaces')
      cy.wait('@namespace-list')
      cy.get('[data-test-id="link-visit-namespace-crm"]').click({ force: true })
      // We click on the namespaces dropdown in the header and on manage namespaces
      cy.get('[data-test-id="select-namespace"]').click().find('a[href="/namespaces/manage"]').click()
      // We check if create new namespace button exist, thus we are in manage namespaces page
      cy.get('[data-test-id="button-create"]').should('exist')
    })
  })
})
