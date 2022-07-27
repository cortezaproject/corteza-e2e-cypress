/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for deleting a namespace', () => {
  before(() => {
    cy.login({ email, password })
  })
  context('Test for deleting the created namespaces', () => {
    it('should be able to delete the namespace successfully', () => {
      cy.get('[data-test-id="button-edit-namespace"]:last').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.contains('Edited namespace').should('not.exist')
    })
  })
})
