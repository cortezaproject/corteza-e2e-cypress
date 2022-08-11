/// <reference types="cypress" />
const composeURL = Cypress.env('webappLink').composeURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for editing a module', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: composeURL })
    }
  })

  context('Test for deleting a module', () => {
    it('should be able to delete the module', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-visit-namespace"]:last').click()
      cy.get('[data-test-id="button-admin"]').click()
      cy.get('[data-test-id="table-modules-list"] > tbody').find(':first').click()
      cy.get('[data-test-id="editor-toolbar"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('[data-test-id="button-delete-confirm"]').click()
      })
      // We check if the success toast appears
      cy.get('.b-toast-success') 
      cy.contains('cypress_module').should('not.exist')
    })
  })
})
