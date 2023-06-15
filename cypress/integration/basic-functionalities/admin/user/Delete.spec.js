/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting a user', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for deleting a user', () => {
    it('should be able to delete a user', () => {
      cy.intercept('/api/system/users/?query=automated&deleted=0&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('delete_user')
      cy.intercept('/api/system/users/?query=missing&deleted=0&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('missing_user')
      cy.get('.nav-sidebar', { timeout: 10000 }).contains('Users').click()
      cy.get('[data-test-id="input-search"]', { timeout: 10000 }).type('automated')
      cy.wait('@delete_user')
      cy.get('#resource-list > tbody > tr:last', { timeout: 10000 }).should('exist').click()
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.contains('automated', { timeout: 10000 }).should('not.exist')
      cy.get('[data-test-id="input-search"]', { timeout: 10000 }).type('missing')
      cy.wait('@missing_user')
      cy.get('#resource-list > tbody > tr:last', { timeout: 10000 }).click()
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.contains('missing').should('not.exist')
    })
  })
})
