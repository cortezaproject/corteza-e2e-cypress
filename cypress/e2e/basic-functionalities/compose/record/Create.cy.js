/// <reference types="cypress" />
import {
  provisionAll,
  provisionDefaultNamespaceCreate,
  provisionDefaultRecordCreate,
  provisionDefaultRecordDelete,
  provisionDefaultAuthClientCreate
} from '../../../../provision/list'

import merge from 'lodash.merge'
import { module, listPage, listLayout, recordPage, recordLayout } from '../../../../provision/api/compose'

const composeURL = Cypress.env('COMPOSE_URL')

describe('Test for creating a record', () => {
  before(() => {
    let moduleID = 0
    let jwtToken = ""

    cy.seedDb([
      ...provisionAll,
      ...provisionDefaultNamespaceCreate,
      ...provisionDefaultAuthClientCreate,
    ])

    cy.authenticateClient()
    .then(jt => jwtToken = jt)

      // create module
      .then(jwtToken => cy.moduleCreate(jwtToken, module))
      .then(module => {moduleID = module.moduleID})

      // list page for the module
      .then(() => cy.pageCreate(jwtToken, merge(listPage, {blocks: [{options:{moduleID: moduleID}}]})))
      .then(({ pageID }) => cy.pageLayoutCreate(jwtToken, merge(listLayout, {pageID})))

      // record page
      .then(() => cy.pageCreate(jwtToken, merge(recordPage, { moduleID })))
      .then(({ pageID }) => cy.pageLayoutCreate(jwtToken, merge(recordLayout, { pageID })))
  })

  beforeEach(() => {
    cy.seedDb([
      ...provisionDefaultRecordDelete,
      ...provisionDefaultRecordCreate,
    ])

    cy.preTestLogin({ url: composeURL })

    // we got this via provisioning
    cy.visit(composeURL, { retryOnStatusCodeFailure: true, timeout: 30000 })
    cy.visit(composeURL + '/ns/cypress_namespace/pages', { retryOnStatusCodeFailure: true, timeout: 30000 })
  })

  context('Test for creating a record through the all records button', () => {
    it('should be able to create a record ', () => {
      cy.get('[data-test-id="button-admin"]', { timeout: 10000 })
        .should('exist')
        .click({ force: true })
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-all-records"] a', { timeout: 1000 }).click({ force: true })
      cy.get('[data-test-id="button-add-record"]', { timeout: 1000 }).click({ force: true })
      cy.get('[data-test-id="field-name"]').type('John')
      cy.get('[data-test-id="field-surname"]').type('Doe')
      cy.get('[data-test-id="field-age"]').clear().type(28)
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.contains('View').should('exist')
      cy.get('.card-body', { timeout: 10000 }).should('exist').contains('John')
      cy.get('.card-body').should('exist').contains('Doe')
      cy.get('.card-body').should('exist').contains(28, { timeout: 1000 })
      cy.url().should('contain', '/record')
    })
  })

  context('Test for creating a record through the public page', () => {
    it('should be able to create a record ', () => {
      cy.get('[data-test-id="button-add-record"]', { timeout: 10000 })
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
      cy.get('.record-list-table td:nth-child(2)', { timeout: 10000 })
        .eq(0)
        .click({ force: true })
      cy.get('[data-test-id="button-add-new"]').click({ force: true })
      cy.get('[data-test-id="field-name"]').type('Mark')
      cy.get('[data-test-id="field-surname"]').type('Fritz')
      cy.get('[data-test-id="field-age"]').clear().type(30)
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('.card-body', { timeout: 10000 }).contains(30).should('exist')
      cy.get('.card-body').contains('Mark').should('exist')
      cy.get('.card-body').contains('Fritz').should('exist')

      // test for checking if back, delete, clone, edit and add new buttons are not displayed in record view
      cy.get('[data-test-id="button-back"]').should('exist')
      cy.get('[data-test-id="button-delete"]').should('exist')
      cy.get('[data-test-id="button-clone"]').should('exist')
      cy.get('[data-test-id="button-edit"]').should('exist')
      cy.get('[data-test-id="button-add-new"]').should('exist')

      cy.url().should('contain', '/record')
    })
  })

  context('Test for checking the back button functionality in admin record view', () => {
    it('should be able to go back', () => {
      cy.get('[data-test-id="button-admin"]', { timeout: 10000 })
        .should('exist')
        .click({ force: true })
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-all-records"] a', { timeout: 1000 }).click({ force: true })

      cy.get('.record-list-table td:nth-child(2)', { timeout: 10000 })
        .eq(0)
        .click({ force: true })
      cy.get('[data-test-id="button-back"]').click({ force: true })
      cy.url().should('contain', 'record/list')
    })
  })

  context('Test for checking the back button functionality in public record view', () => {
    it('should be able to go back', () => {
      cy.get('.record-list-table td:nth-child(2)', { timeout: 10000 })
        .eq(0)
        .click({ force: true })
      cy.get('[data-test-id="button-back"]').click({ force: true })
      cy.url().should('match', /cypress_namespace\/pages\/\d+/)
    })
  })
})
