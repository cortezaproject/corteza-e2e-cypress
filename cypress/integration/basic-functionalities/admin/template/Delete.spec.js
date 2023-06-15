/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting a template', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for deleting a template', () => {
    it('should be able to delete a template', () => {
      cy.intercept('/api/system/template/?query=automated_template&handle=&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('delete_template')
      cy.get('.nav-sidebar', { timeout: 10000 }).contains('Templates').click()
      cy.get('[data-test-id="input-search"]').type('automated_template')
      cy.wait('@delete_template')
      cy.get('#resource-list > tbody > tr:last', { timeout: 10000 }).click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.get('[data-test-id="input-search"]').type('automated_template')
      cy.contains('automated_template').should('not.exist')
    })

    it('should be able to delete the remaining created templates', () => {
      cy.intercept('/api/system/template/?query=duplicate&handle=&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('duplicate')
      cy.get('[data-test-id="input-search"]').clear().type('duplicate')
      cy.wait('@duplicate')
      cy.get('#resource-list > tbody > tr:last', { timeout: 10000 }).click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
    })
  })
})
