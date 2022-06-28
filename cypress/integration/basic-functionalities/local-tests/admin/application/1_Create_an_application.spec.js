/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up
describe('Test for creating a role', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for creating an application without a name entered', () => {
    it('should not be able to create an application', () => {
      // This test might fail sometimes with an uncaught:error exception
      // so just try to rerun the test or increase the wait time below
      cy.wait(3000) // We wait for 3s in order the page to be fully loaded/rendered
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
        cy.get('[data-test-id="checkbox-enabled"]').check({force: true})
        cy.get('[data-test-id="button-submit"]').click()
        cy.get('[data-icon="check"]') // we checked if the submit button's content changed to a check icon
        cy.wait(2000) // We wait 2s in order the button to be switched from check to submit
        cy.get('[data-test-id="button-submit"]').should('exist')
      })
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
    })
  })

  context('Test for checking if the created application exists', () => {
    it('should exist', () => {
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').should('have.value', 'automated application')
      })
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="input-search"]').type('automated')
      cy.wait(2000) // We wait 2s in order the search to be completed
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
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
      cy.get('[data-test-id="input-created-at"]').should('exist')
    })
  })
})
