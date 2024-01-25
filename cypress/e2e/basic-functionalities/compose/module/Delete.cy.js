/// <reference types="cypress" />
import {
  provisionAll,
  provisionDefaultNamespaceCreate,
  provisionDefaultModuleCreate
} from '../../../../provision/list'

const composeURL = Cypress.env('COMPOSE_URL')

describe('Test for deleting a module', () => {
  before(() => {
    cy.seedDb([
      ...provisionAll,
      ...provisionDefaultNamespaceCreate,
      ...provisionDefaultModuleCreate
    ])

    cy.preTestLogin({ url: composeURL })
  })

  context('Test for deleting a module', () => {
    it('should be able to delete the module', () => {
      cy.intercept('/api/compose/namespace/37169336485952369/module/?query=cypress&limit=100&incTotal=true&pageCursor=&sort=name+ASC')
      .as('module-search')
      cy.visit(composeURL + '/namespaces')
      cy.searchItem()
      cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]').click({ force: true })
      cy.get('[data-test-id="button-admin"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="table-modules-list"]').within(() => {
        cy.searchItem()
      })
      cy.wait('@module-search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="editor-toolbar"]', { timeout: 10000 }).within(() => {
        cy.get('[data-test-id="button-delete"]').click({ force: true })
        cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
      })
      cy.contains('cypress_module').should('not.exist')
    })
  })
})
