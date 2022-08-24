/// <reference types="cypress" />
const adminURL = Cypress.env('webappLink').adminURL
const email = Cypress.env('user').email
const newEmail = Cypress.env('user').newEmail
const password = Cypress.env('user').password
const newPassword = Cypress.env('user').newPassword

describe('Testing permissions', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: adminURL })
    }
  })

  context('Test for creating additional role', () => {
    it('should create a role that will have limited permissions', () => {
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

  context('Test for creating additional user', () => {
    it('should create a user that will have limited permissions', () => {
      cy.get('.nav-sidebar').contains('Users').click()
      cy.get('[data-test-id="button-new-user"]').click()
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-name"]').type('Permissions account')
      cy.get('[data-test-id="input-handle"]').type('permissions_account')
      cy.get('[data-test-id="button-submit"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success')
      cy.get('.input-group').type('Test')
      cy.get('.filtered-role').click()
      cy.get('.card-footer:eq(1)').within(() => {
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('[data-test-id="input-new-password"]').type(newPassword, { force: true })
      cy.get('[data-test-id="input-confirm-password"]').type(newPassword, { force: true })
      cy.get('.card-footer:last').within(() => {
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We check if the success toast appears
      cy.get('.b-toast-success')
      cy.wait(1000)
    })
  })
})
