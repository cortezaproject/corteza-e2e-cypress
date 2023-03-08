/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting a module', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test for deleting a module', () => {
    it('should be able to delete the module', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]').click({ force: true })
      cy.get('[data-test-id="button-admin"]').click()
      // We wait 1s in order the page to be loaded
      cy.wait(1000)
      cy.get('[data-test-id="table-modules-list"] > .card-body > div > #resource-list > tbody', { timeout: 10000 }).click()
      cy.get('[data-test-id="editor-toolbar"]', { timeout: 10000 }).within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('[data-test-id="button-delete-confirm"]').click()
      })
      // We check if the success toast appears
      cy.get('.b-toast-success') 
      cy.contains('cypress_module').should('not.exist')
    })
  })
})
