/// <reference types="cypress" />
import { provisionAll, provisionDefaultNamespaceCreate } from '../../../../provision/list'

const composeURL = Cypress.env('COMPOSE_URL')

describe('Test for deleting a namespace', () => {
  before(() => {
    cy.seedDb([...provisionAll, ...provisionDefaultNamespaceCreate])
    cy.preTestLogin({ url: composeURL })
  })

  context('Test for deleting a namespace', () => {
    it('should be able to delete the namespace successfully', () => {
      cy.intercept('/api/compose/namespace/?query=&limit=100&incTotal=true&sort=name+ASC')
        .as('ns-manage')
      cy.intercept('/api/compose/namespace/?query=cypress&limit=100&incTotal=true&pageCursor=&sort=name+ASC')
        .as('ns-search')
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]', { timeout: 10000 })
        .should('exist')
        .click({ force: true })
      cy.wait('@ns-manage')
      cy.searchItem()
      cy.wait('@ns-search')
      cy.get('tbody').contains('cypress').should('exist').click({ force: true })
      cy.get('[data-test-id="button-delete"]').click({ force: true })
      cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
      cy.searchItem()
      cy.get('[data-test-id="no-matches"]').should('exist')
    })
  })
})
