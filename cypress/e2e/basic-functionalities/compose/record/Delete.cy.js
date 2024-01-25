/// <reference types="cypress" />
import {
  provisionAll,
  provisionDefaultNamespaceCreate,
  provisionDefaultModuleCreate,
  provisionDefaultFieldCreate,
  provisionDefaultPageCreate,
  provisionDefaultRecordCreate,
} from '../../../../provision/list'

const composeURL = Cypress.env('COMPOSE_URL')

describe('Test for deleting a record', () => {
  before(() => {
    cy.seedDb([
      ...provisionAll,
      ...provisionDefaultNamespaceCreate,
      ...provisionDefaultModuleCreate,
      ...provisionDefaultFieldCreate,
      ...provisionDefaultPageCreate,
      ...provisionDefaultRecordCreate,
    ])
  })

  beforeEach(() => {
    cy.preTestLogin({ url: composeURL })

    cy.visit(composeURL + '/namespaces')
    cy.searchItem()
    cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]').click({ force: true })
  })

  context('Test for deleting a record through the all records button', () => {
    it('should be able to delete the record through the record viewer', () => {
      cy.get('[data-test-id="button-admin"]', { timeout: 10000 })
        .should('exist')
        .click({ force: true })
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 })
        .click({ force: true })
      cy.get('[data-test-id="button-all-records"] a').click({ force: true })
      cy.get('.record-list-table td:nth-child(2)', { timeout: 10000 })
        .eq(0)
        .click({ force: true })
      cy.get('[data-test-id="button-delete"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
      // err
      cy.get('.alert').should('exist')
    })
  })

  context('Test for deleting a record on a public page', () => {
    it('should be able to delete a record by clicking on it', () => {
      cy.get('.record-list-table td:nth-child(2)', { timeout: 10000 })
        .eq(0)
        .click({ force: true })
      cy.get('[data-test-id="button-delete"]').click({ force: true })
      cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
      cy.get('.alert').should('exist')
    })
  })

  context('Test for deleting a record by selecting', () => {
    it('should be able to delete a record by check-marking it', () => {
      cy.get('.record-list-table td:nth-child(2)', { timeout: 10000 })
        .eq(0)
        .get('[type="checkbox"]:last', { timeout: 10000 })
        .check({ force: true })
      cy.get('div > div > [data-test-id="button-delete"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
    })
  })
})  
