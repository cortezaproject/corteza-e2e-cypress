/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating an application', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for creating an application without a name entered', () => {
    it('should not be able to create an application', () => {
      // We wait for 2s in order the page to be fully loaded/rendered
      cy.wait(2000)
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="button-new-application"]').click()
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })
  })

  context('Test for checking that delete and new buttons are not displayed when in create mode', () => {
    it('should not be displayed when creating an application', () => {
      cy.get('[data-test-id="button-new-application"]').should('not.exist')
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').should('not.exist')
      })
    })
  })

  context('Test for creating an application', () => {
    it('should be able to create an application', () => {
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('automated application')
        cy.get('[data-test-id="checkbox-enabled"]').check({ force: true })
        cy.get('[data-test-id="button-submit"]').click()
        // We check if the submit button's content changed to a check icon
        cy.get('[data-icon="check"]')
        // We wait 1s in order the button to be switched from check to submit
        cy.wait(1000)
        cy.get('[data-test-id="button-submit"]').should('exist')
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })
  })

  context('Test for checking if the created application exists', () => {
    it('should exist', () => {
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').should('have.value', 'automated application')
      })
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="input-search"]').type('automated')
      // We wait 1s in order the search to be completed
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-application-id"]').should('exist')
        cy.get('[data-test-id="input-created-at"]').should('exist')
        cy.get('[data-test-id="checkbox-enabled"]').should('be.checked')
      })
    })
  })

  context('Test for creating an application with same name as an already created one', () => {
    it('should be able to create an application with identical name', () => {
      cy.get('.nav-sidebar').contains('Application').click()
      cy.get('[data-test-id="button-new-application"]').click()
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('automated application')
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.get('[data-test-id="input-created-at"]').should('exist')
    })
  })
})
