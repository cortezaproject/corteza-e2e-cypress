/// <reference types="cypress" />
const adminURL = Cypress.env('webappLink').adminURL
const email = Cypress.env('user').email
const newEmail = Cypress.env('user').newEmail
const password = Cypress.env('user').password
const newPassword = Cypress.env('user').newPassword

describe('Test for creating a role with limited permissions', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: adminURL })
    }
  })

  context('Test for creating additional role', () => {
    it('should create a role that will have limited permissions', () => {
      cy.visit(adminURL + '/')
      // We wait for 2s in order the page to be fully loaded/rendered
      cy.wait(2000)
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="button-new-role"]').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('Test')
        cy.get('[data-test-id="input-handle"]').type('test')
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })
  })
})
