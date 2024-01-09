/// <reference types="cypress" />
import { provisionAll } from '../../../../../provision/list'

const composeURL = Cypress.env('COMPOSE_URL')

describe('Testing the sidebar custom logo', () => {
  before(() => {
    cy.seedDb(provisionAll)
    cy.preTestLogin({ url: composeURL })
    cy.visit(composeURL + '/namespaces')
  })

  context('Testing the sidebar custom logo', () => {
    it('should be able to have a default logo', () => {
      cy.get('[data-test-id="input-search"]', { timeout: 10000 }).type('crm')
      // We need to visit a namespace so that the sidebar will be present
      cy.get('[data-test-id="link-visit-namespace-crm"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="img-main-logo"]')
        .should('have.attr', 'src')
        .should('include','attachment')
    })
  })
})
