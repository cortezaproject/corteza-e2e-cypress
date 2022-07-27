/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for editing a record page', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for editing a record page', () => {
    it('should be able to edit a record page', () => {
      cy.get('[data-test-id="button-visit-namespace"]:last').click()
      cy.get('[data-test-id="button-admin"]').click()
      cy.get('.nav-sidebar').contains('Pages').click()
      cy.get('[data-test-id="button-page-edit"]:first').click()
      cy.get('[data-test-id="dropdown-delete"]').click()
      cy.get('[data-test-id="dropdown-item-delete-sub-pages"]').click()
      cy.contains('Cypress page').should('not.exist')
      cy.get('[data-test-id="button-page-edit"]').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
     cy.contains('New Page').should('not.exist')
    })
  })
})
