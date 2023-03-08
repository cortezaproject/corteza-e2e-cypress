/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for editing an application', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for checking that new and delete buttons are displayed when in edit mode', () => {
    it('should be displayed when editing a template', () => {
      cy.get('.nav-sidebar', { timeout: 10000 }).contains('Applications').click()
      cy.get('[data-test-id="input-search"]').type('automated application')
      // We should wait in order the search to be completed
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last > td:last > a', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-new-application"]').should('exist')
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').should('exist')
      })
    })
  })

  context('Test for editing an application', () => {
    it('should be able to edit the application', () => {
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').clear().type('edited application')
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })
  })

  context('Test for checking if the template got edited', () => {
    it('should be edited', () => {
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').should('have.value', 'edited application')
        cy.get('[data-test-id="input-updated-at"]').should('exist')
      })
      cy.get('.nav-sidebar').contains('Application').click()
      cy.get('[data-test-id="input-search"]').type('edited application')
      // We should wait in order the search to be completed
      cy.wait(1000)
      cy.contains('edited application').should('exist')
    })
  })

  context('Test for checking if you can create a template through edit mode', () => {
    it('should be able to create a template', () => {
      cy.get('#resource-list > tbody > tr:last > td:last > a', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-new-application"]').click()
      cy.url().should('contain', '/new')
    })
  })
})
