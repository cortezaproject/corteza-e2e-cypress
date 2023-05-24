/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a role for testing advanced functionalities', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for creating a role for testing advanced functionalities', () => {
    it('should create a role', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="button-new-role"]').click()
      cy.contains('Basic information').should('exist')
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('Advanced functionalities')
        cy.get('[data-test-id="input-handle"]').type('advanced_functionalities')
        cy.get('[data-test-id="textarea-description"]').type('Role for testing advanced functionalities.')
        cy.get('[data-test-id="button-submit"]').click()
      })
    })
  })
})
