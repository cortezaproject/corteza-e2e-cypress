/// <reference types="cypress" />
import {
  provisionAll,
  provisionDefaultNamespaceCreate,
  provisionDefaultModuleCreate,
  provisionDefaultFieldCreate,
} from '../../../../provision/list'

const composeURL = Cypress.env('COMPOSE_URL')

describe('Test for creating a record page', () => {
  before(() => {
    cy.seedDb([
      ...provisionAll,
      ...provisionDefaultNamespaceCreate,
      ...provisionDefaultModuleCreate,
      ...provisionDefaultFieldCreate,
    ])
  })

  beforeEach(() => {
    cy.preTestLogin({ url: composeURL })

    cy.visit(composeURL + '/namespaces')
    cy.get('[data-test-id="input-search"]').type('cypress')
    cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]').click({ force: true })
    cy.get('[data-test-id="button-admin"]').click({ force: true })
  })

  context('Test for creating a record page', () => {
    it('should be able to create a record page', () => {
      cy.get('[data-test-id="table-modules-list"] [data-test-id="input-search"]')
        .type('cypress')
      cy.get('[data-test-id="button-record-page-create"]').click({ force: true })
      cy.get('.related-pages-dropdown').click({ force: true })
      cy.get('[data-test-id="dropdown-link-record-list-page-create"]').click({ force: true })
      cy.visit(composeURL + '/ns/cypress_namespace/admin/pages')
      cy.get('[data-test-id="button-page-view"]:first').click({ force: true })
    })
  })

  context('Test for creating a page', () => {
    it('should be able to create a page', () => {
      cy.get('.nav-sidebar').contains('Pages').click({ force: true })
      cy.get('[data-test-id="input-name"]').type('New Page')
      cy.get('[data-test-id="button-create-page"]').click({ force: true })
      cy.get('[data-test-id="input-handle"]').type('new_cypress_page')
      cy.get('[data-test-id="input-description"]').type('Description')
      cy.get('[data-test-id="checkbox-page-visibility"]').check({ force: true }) 
      cy.get('[data-test-id="button-save-and-close"]').click({ force: true })
    })
  })
})
