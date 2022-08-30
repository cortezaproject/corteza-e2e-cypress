/// <reference types="cypress" />
const adminURL = Cypress.env('webappLink').adminURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password
const oneURL = Cypress.env('webappLink').oneURL

describe('Test for un-deleting admin application', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: adminURL })
    }
  })

  context('Test for un-deleting admin application', () => {
    it('should be able to create an application', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded/rendered
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="button-new-application"]').click()
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('Test un-delete application')
        cy.get('[data-test-id="checkbox-enabled"]').check({ force: true })
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should be able to un-delete an app', () => {
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="input-search"]').type('Test un-delete application')
      // We wait 1s in order the search to be completed
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.btn-danger').click()
      })
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="filter-deleted-apps"]').contains('Only').click()
      cy.get('[data-test-id="input-search"]').type('Test un-delete application')
      // We wait 1s in order the search to be completed
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click({ force: true })
      cy.get('[data-test-id="card-application-info"]').within(() => {
        // Here we are also testing the created/updated/delete at part
        cy.get('[data-test-id="input-name"]').type(' ')
        cy.get('[data-test-id="button-submit"]').click()
        cy.get('[data-test-id="input-deleted-at"]').should('exist')
        cy.get('[data-test-id="input-created-at"]').should('exist')
        cy.get('[data-test-id="input-updated-at"]').should('exist')
        cy.get('[data-test-id="button-undelete"]').click()
        cy.get('.btn-danger').click()
        cy.get('[data-test-id="input-deleted-at"]').should('not.exist')
      })

      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="input-search"]').type('Test un-delete application').should('exist')
    })
  })
})
