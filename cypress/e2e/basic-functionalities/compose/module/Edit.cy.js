/// <reference types="cypress" />
import {
  provisionAll,
  provisionDefaultNamespaceCreate,
  provisionDefaultModuleCreate,
  provisionDefaultFieldCreate
} from '../../../../provision/list'

const composeURL = Cypress.env('COMPOSE_URL')

describe('Test for editing a module', () => {
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

    cy.intercept('/api/compose/namespace/37169336485952369/module/?query=cypress&limit=100&incTotal=true&pageCursor=&sort=name+ASC')
      .as('module-search')
    cy.visit(composeURL + '/namespaces')
    cy.searchItem()
    cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]', { timeout: 10000 })
      .should('exist')
      .click({ force: true })
    cy.get('[data-test-id="button-admin"]', { timeout: 10000 }).click({ force: true })
    cy.get('[data-test-id="table-modules-list"]').within(() => {
      cy.searchItem()
    })
    cy.wait('@module-search')
    cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
  })

  context('Test for editing the module data and a record field', () => {
    it('should be able to edit the module and field and check if the changes were persisted', () => {
      cy.get('[data-test-id="input-module-name"]').type(' edited')
      cy.get('[data-test-id="input-module-handle"]').type('_edited')
      cy.get('[data-test-id="table-module-fields"] > tbody').find('tr').eq(0).within(() => {
        cy.get('input:first').clear({ force: true }).type('name', { force: true })
      })    
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('[data-test-id="button-save-and-close"]', { timeout: 10000 }).click({ force: true })

      // Check if the change was persisted
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="input-module-name"]', { timeout: 10000 }).should('have.value', 'Cypress module edited')
      cy.get('[data-test-id="input-module-handle"]', { timeout: 10000 }).should('have.value', 'cypress_module_edited')
      cy.get('[data-test-id="button-back-without-save"]', { timeout: 10000 }).click({ force: true })
    })
  })

  context('Test if the federation, export and permissions buttons are displayed', () => {
    // Discovery and federation settings will only exist if they are enabled in the .env file
    it('should be displayed when in edit mode', () => {
      cy.get('[data-test-id="button-federation-settings"]', { timeout: 10000 }).should('exist')
      cy.get('[data-test-id="button-export"]').should('exist')
      cy.get('.permissions-dropdown').should('exist')
    })
  })
})
