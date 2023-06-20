/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting a namespace', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test for deleting the created namespaces', () => {
    it('should be able to delete the namespace successfully', () => {
      cy.intercept("/api/compose/namespace/?query=edited&limit=100&incTotal=true&pageCursor=&sort=name+ASC").as("ns_edited")
      cy.intercept("/api/compose/namespace/?query=Name&limit=100&incTotal=true&pageCursor=&sort=name+ASC").as("ns_name")
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="input-search"]').type('edited')
      cy.wait("@ns_edited")
      cy.wait(1000)
      cy.get('tbody').contains('edited').should('exist').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.get('[data-test-id="input-search"]').type('Edited namespace')
      cy.get('[data-test-id="no-matches"]').should('exist')

      cy.get('[data-test-id="input-search"]').clear().type('Name')
      cy.wait("@ns_name")
      cy.wait(1000)
      cy.get('tbody').contains('Name').should('exist').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.get('[data-test-id="input-search"]').clear().type('Name')
      cy.get('[data-test-id="no-matches"]').should('exist')
    })
  })
})
