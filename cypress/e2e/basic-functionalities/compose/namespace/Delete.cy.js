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
      cy.intercept('/api/compose/namespace/?query=&limit=100&incTotal=true&sort=name+ASC').as('ns-manage')
      cy.intercept('/api/compose/namespace/?query=edited&limit=100&incTotal=true&pageCursor=&sort=name+ASC').as('ns-edited')
      cy.intercept('/api/compose/namespace/?query=No+handle&limit=100&incTotal=true&pageCursor=&sort=name+ASC').as('ns-name')
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]', { timeout: 10000 })
      .should('exist')
      .click({ force: true })
      cy.wait('@ns-manage')
      cy.get('[data-test-id="input-search"]', { timeout: 10000 }).should('exist').type('edited')
      cy.wait('@ns-edited')
      cy.get('tbody').contains('edited').should('exist').click({ force: true })
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.get('[data-test-id="input-search"]').type('Edited namespace')
      cy.get('[data-test-id="no-matches"]').should('exist')

      cy.get('[data-test-id="input-search"]').clear().type('No handle')
      cy.wait('@ns-name')
      cy.get('tbody').contains('No handle').should('exist').click({ force: true })
      cy.get('[data-test-id="button-delete"]').click({ force: true })
      cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
      cy.get('[data-test-id="input-search"]').clear().type('No handle')
      cy.get('[data-test-id="no-matches"]').should('exist')
    })
  })
})
