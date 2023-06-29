/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a template for testing advanced functionalities', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for creating a template for testing advanced functionalities', () => {
    it('should create a template', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Templates').click()
      cy.get('[data-test-id="button-new-template"]').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').type('Test template')
        cy.get('[data-test-id="input-handle"]').type('test_template')
        cy.get('[data-test-id="textarea-description"]').type('Template for testing advanced functionalities.')
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('[data-test-id="input-created-at"]').should('exist')
    })
  })
})
