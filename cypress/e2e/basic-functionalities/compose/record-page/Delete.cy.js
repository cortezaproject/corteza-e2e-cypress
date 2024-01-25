/// <reference types="cypress" />
import {
  provisionAll,
  provisionDefaultNamespaceCreate,
  provisionDefaultModuleCreate,
  provisionDefaultFieldCreate,
  provisionDefaultPageCreate,
} from '../../../../provision/list'

const composeURL = Cypress.env('COMPOSE_URL')

describe('Test for deleting a record page', () => {
  before(() => {
    cy.seedDb([
      ...provisionAll,
      ...provisionDefaultNamespaceCreate,
      ...provisionDefaultModuleCreate,
      ...provisionDefaultFieldCreate,
      ...provisionDefaultPageCreate,
    ])

    cy.preTestLogin({ url: composeURL })
  })

  context('Test for deleting a record page', () => {
    it('should be able to delete a record page', () => {
      cy.visit(composeURL + '/namespaces')
      cy.searchItem()
      cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]').click({ force: true })
      cy.get('[data-test-id="button-admin"]', { timeout: 10000 }).click({ force: true })
      cy.visit(composeURL + '/ns/cypress_namespace/admin/pages')
      cy.get('[data-test-id="button-page-edit"]:first').click({ force: true })
      cy.get('[data-test-id="dropdown-delete"]').click({ force: true })
      cy.get('[data-test-id="dropdown-item-delete-sub-pages"]').click({ force: true })
      cy.contains('Cypress page').should('not.exist')
    })
  })
})
