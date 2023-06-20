/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting an application', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for deleting an application', () => {
    it('should be able to delete it', () => {
      cy.intercept('/api/system/application/?query=automated+application&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('app')
      cy.get('.nav-sidebar', { timeout: 10000 }).contains('Applications').click()
      cy.get('[data-test-id="input-search"]').type('automated application')
      cy.wait('@app')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click()
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.get('[data-test-id="input-search"]').type('automated application')
      cy.contains('automated application').should('not.exist')
      // We are also deleting the other created application
      cy.get('[data-test-id="input-search"]').clear().type('edited application')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click()
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
    })
  })
})
