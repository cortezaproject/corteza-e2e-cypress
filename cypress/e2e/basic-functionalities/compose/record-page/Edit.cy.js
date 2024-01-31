/// <reference types="cypress" />
import {
  provisionAll,
  provisionDefaultNamespaceCreate,
  provisionDefaultModuleCreate,
  provisionDefaultFieldCreate,
  provisionDefaultPageCreate,
} from '../../../../provision/list'

const composeURL = Cypress.env('COMPOSE_URL')

describe('Test for editing a record page', () => {
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

  context('Test for editing a record page', () => {
    it('should be able to edit a record page and check if the change was persisted', () => {
      cy.visit(composeURL + '/namespaces')
      cy.searchItem()
      cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]').click({ force: true })
      cy.get('[data-test-id="button-admin"]', { timeout: 10000 }).should('exist').click({ force: true })
      cy.contains('Modules').should('exist')
      cy.get('[data-test-id="button-public"]', { timeout: 10000 }).should('exist')
      cy.get('.nav-sidebar').contains('Pages', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="button-page-edit"]:first').click({ force: true })
      cy.get('[data-test-id="input-title"]').clear().type('Cypress page')
      cy.get('[data-test-id="input-handle"]').clear().type('cypress_page')
      cy.get('[data-test-id="input-description"]').clear().type('Page description')
      cy.get('[data-test-id="button-save-and-close"]').click({ force: true })

      // Check if the change was persisted
      cy.get('[data-test-id="button-page-edit"]:first').click({ force: true })
      cy.get('[data-test-id="input-title"]').should('have.value', 'Cypress page')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'cypress_page')
      cy.get('[data-test-id="input-description"]').should('have.value', 'Page description')
    })
  })
})
