/// <reference types="cypress" />
import { provisionAll } from '../../../../../provision/list'

const composeURL = Cypress.env('COMPOSE_URL')

describe('Testing the sidebar default logo', () => {
  before(() => {
    cy.seedDb(provisionAll)
    cy.preTestLogin({ url: composeURL })
    cy.visit(composeURL + '/namespaces')
  })

  context('Testing the sidebar default logo', () => {
    it('should be able to see the default logo', () => {
      cy.searchItem({ item: 'crm' })
      // We need to visit a namespace so that the sidebar will be present
      cy.get('[data-test-id="link-visit-namespace-crm"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="img-main-logo"]')
        .should('have.attr', 'src')
        .should('include','assets')
    })
  })
})
