/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for checking role inputs', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for checking role inputs', () => {
    it('should be able to include a permitted role', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Auth Clients').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:first > td > a').click()
      cy.get('[data-test-id="permitted-roles"]').within(() => {
        cy.get('[data-test-id="input-role"]').type('Security administrator{enter}')
        cy.get('[data-test-id="button-add-role"]').click()
      })
      cy.get('.card-footer > [data-test-id="button-submit"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
    })

    it('should be able to include a prohibited role', () => {
      cy.get('[data-test-id="prohibited-roles"]').within(() => {
        cy.get('[data-test-id="input-role"]').type('Developer{enter}')
        cy.get('[data-test-id="button-add-role"]').click()
      })
      cy.get('.card-footer > [data-test-id="button-submit"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
    })

    it('should be able to include a forced role', () => {
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="forced-roles"]').within(() => {
        cy.get('[data-test-id="input-role"]').type('Federation{enter}')
        cy.get('[data-test-id="button-add-role"]').click()
      })
      cy.get('.card-footer > [data-test-id="button-submit"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
    })

    it('should check whether the inputted roles are present', () => {
      cy.get('.nav-sidebar').contains('Auth Clients').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:first > td > a').click()
      cy.get('[data-test-id="selected-row-list"]:eq(0)').should('exist', 'Security administrator')
      cy.get('[data-test-id="selected-row-list"]:eq(1)').should('exist', 'Developer')
      cy.get('[data-test-id="selected-row-list"]:eq(2)').should('exist', 'Federation')
    })
  })
})
