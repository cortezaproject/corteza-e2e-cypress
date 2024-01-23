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
  })

  beforeEach(() => {
    cy.preTestLogin({ url: composeURL })

    cy.visit(composeURL + '/namespaces')
    cy.get('[data-test-id="input-search"]').type('cypress')
    cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]').click({ force: true })
  })

  context('Test for editing a record through the all records button', () => {
    it('should be able to edit the record by viewing it', () => {
      cy.get('[data-test-id="button-admin"]', { timeout: 10000 })
        .should('exist')
        .click({ force: true })
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })  
      cy.get('[data-test-id="button-all-records"] a', { timeout: 10000 }).click({ force: true })
      cy.get('.record-list-table td:nth-child(2)', { timeout: 10000 })
        .eq(0)
        .click({ force: true })
      cy.get('[data-test-id="button-edit"]').click({ force: true })
      cy.get('[data-test-id="field-name"] input').clear().type('Steve')
      cy.get('[data-test-id="field-surname"] input').clear().type('Taker')
      cy.get('[data-test-id="field-age"] input').clear().type(35)
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('.card-body', { timeout: 10000 }).contains(35).should('exist')
      cy.get('.card-body').contains('Steve').should('exist')
      cy.get('.card-body').contains('Taker').should('exist')
      cy.url().should('contain', '/record/')
    })
  })

  context('Test for editing a record on a public page', () => {
    it('should be able to edit a record by clicking on it', () => {
      cy.get('.record-list-table td:nth-child(2)', { timeout: 10000 })
        .eq(0)
        .click({ force: true })
      cy.get('[data-test-id="button-edit"]').click({ force: true })
      cy.get('[data-test-id="field-name"] input').clear().type('Nill')
      cy.get('[data-test-id="field-surname"] input').clear().type('Harris')
      cy.get('[data-test-id="field-age"] input').clear().type(21)
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('.card-body', { timeout: 10000 }).contains(21).should('exist')
      cy.get('.card-body').contains('Nill').should('exist')
      cy.get('.card-body').contains('Harris').should('exist')
      cy.url().should('contain', '/record/')
    })
  })
})
