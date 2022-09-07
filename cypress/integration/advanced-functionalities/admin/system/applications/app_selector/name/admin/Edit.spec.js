/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for editing the name of the application', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for editing the name of the application', () => {
    it('should not be able to delete the name in app selector', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded/rendered
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="input-search"]').type('Testing application')
      // We wait 1s in order the search to be completed
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="checkbox-enabled"]').check({ force: true })
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.get('[data-test-id="card-application-selector"]').within(() => {
        cy.get('[data-test-id="input-name"]').clear()
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.get('[data-test-id="input-name"]').should('have.value', 'Testing application')
    })

    it('should be able to edit the name in app selector', () => {
      cy.get('[data-test-id="card-application-selector"]').within(() => {
        cy.get('[data-test-id="input-name"]').clear().type('Edited testing application')
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should check if the name was edited', () => {
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="input-search"]').type('Testing application')
      // We wait 1s in order the search to be completed
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-application-selector"]').within(() => {
        cy.get('[data-test-id="input-name"]').should('have.value', 'Edited testing application')
      })
    })
  })
})
