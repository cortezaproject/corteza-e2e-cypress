/// <reference types="cypress" />
const composeURL = Cypress.env('webappLink').composeURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for deleting a namespace', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: composeURL })
    }
  })
  
  context('Test for deleting the created namespaces', () => {
    it('should be able to delete the namespace successfully', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-edit-namespace"]:last').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.contains('Edited namespace').should('not.exist')
    })
  })
})
