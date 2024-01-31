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

describe('Test for editing a record', () => {
  before(() => {
    cy.seedDb([
      ...provisionAll,
      ...provisionDefaultNamespaceCreate,
      ...provisionDefaultModuleCreate,
      ...provisionDefaultFieldCreate,
      ...provisionDefaultPageCreate,
      ...provisionDefaultRecordCreate,
    ])

    cy.preTestLogin({ url: composeURL })
  })
  
  context('Test for cloning a record', () => {
    it('should be able to clone a record and check if the changes were persisted', () => {
      cy.visit(composeURL + '/namespaces')
      cy.searchItem()
      cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]').click({ force: true })
      cy.get('[data-test-id="button-admin"]', { timeout: 10000 })
        .should('exist')
        .click({ force: true })
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })  
      cy.get('[data-test-id="button-all-records"] a').click({ force: true })
      cy.get('.record-list-table td:nth-child(2)', { timeout: 10000 })
        .eq(0)
        .click({ force: true })
      cy.get('[data-test-id="button-edit"]').click({ force: true })
      cy.get('[data-test-id="button-clone"]').click({ force: true })
      cy.get('[data-test-id="field-name"] input').clear().type('Bob')
      cy.get('[data-test-id="field-surname"] input').clear().type('Wiser')
      cy.get('[data-test-id="field-age"] input').clear().type(31)
      cy.get('[data-test-id="button-save"]').click({ force: true })

      // Check if the changes were persisted
      cy.get('.card-body').contains(31).should('exist')
      cy.get('.card-body').contains('Bob').should('exist')
      cy.get('.card-body').contains('Wiser').should('exist')
      cy.url().should('contain', '/record/')
    })
  })
})