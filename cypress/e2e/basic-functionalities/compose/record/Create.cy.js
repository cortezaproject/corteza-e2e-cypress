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

describe('Test for creating a record', () => {
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
    cy.get('[data-test-id="button-admin"]', { timeout: 10000 })
      .should('exist')
      .click({ force: true })
    cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })  
    cy.get('[data-test-id="button-all-records"] a', { timeout: 1000 }).click({ force: true })
    cy.get('[data-test-id="button-add-record"]', { timeout: 1000 }).click({ force: true })
  })

  context('Test for creating a record through the all records button', () => {
    it('should be able to create a record ', () => {
      cy.get('[data-test-id="field-name"]').type('John')
      cy.get('[data-test-id="field-surname"]').type('Doe')
      cy.get('[data-test-id="field-age"]').clear().type(28)
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.contains('View').should('exist')
      cy.get('.card-body', { timeout: 10000 }).contains('John').should('exist')
      cy.get('.card-body').contains('Doe').should('exist')
      cy.get('.card-body').contains(28, { timeout: 1000 }).should('exist')
      cy.url().should('contain', '/record')
    })
  })

  context('Test for creating a record through the public page', () => {
    it('should be able to create a record ', () => {
      cy.get('[data-test-id="button-public"]').click({ force: true })
      cy.get('[data-test-id="button-add-record"]', { timeout: 1000 })
        .click({ force: true })
      cy.get('[data-test-id="field-name"]').type('Eddie')
      cy.get('[data-test-id="field-surname"]').type('Turner')
      cy.get('[data-test-id="field-age"]').clear().type(23)
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('.card-body', { timeout: 10000 }).contains(23).should('exist')
      cy.get('.card-body').contains('Eddie').should('exist')
      cy.get('.card-body').contains('Turner').should('exist')
      cy.url().should('contain', '/record')
    })
  })

  context('Test for creating a new record while in record view', () => {
    it('should be able to create a record ', () => {
      cy.get('[data-test-id="button-public"]').click({ force: true })
      cy.get('.record-list-table td:nth-child(2)', { timeout: 10000 })
        .eq(0)
        .click({ force: true })
      cy.get('[data-test-id="button-add-new"]').click({ force: true })
      cy.get('[data-test-id="field-name"]').type('Mark')
      cy.get('[data-test-id="field-surname"]').type('Fritz')
      cy.get('[data-test-id="field-age"]').clear().type(30)
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('.card-body', { timeout: 10000 }).contains('30').should('exist')
      cy.get('.card-body').contains('Mark').should('exist')
      cy.get('.card-body').contains('Fritz').should('exist')
      cy.url().should('contain', '/record')
    })
  })

  context('Test for checking if back, delete, clone, edit and add new buttons are not displayed in record view', () => {
    it('should be displayed when in record view ', () => {
      cy.get('[data-test-id="button-back"]').should('exist')
      cy.get('[data-test-id="button-delete"]').should('not.exist')
      cy.get('[data-test-id="button-clone"]').should('not.exist')
      cy.get('[data-test-id="button-edit"]').should('not.exist')
      cy.get('[data-test-id="button-add-new"]').should('not.exist')
    })
  })

  context('Test for checking the back button functionality in record view', () => {
    it('should be able to go back', () => {
      cy.get('[data-test-id="button-back"]').click({ force: true })
      cy.url().should('contain', 'record/list')
    })
  })
})
