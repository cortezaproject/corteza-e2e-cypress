/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Test for creating a user with limited permissions', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for creating additional user', () => {
    it('should create a user that will have limited permissions', () => {
      cy.visit(adminURL + '/')
      // We wait for 4s in order the page to be fully loaded/rendered
      cy.wait(4000)
      cy.get('.nav-sidebar').contains('Users').click()
      // We wait for 3s in order the page to be fully loaded/rendered
      cy.wait(3000)
      cy.get('[data-test-id="button-new-user"]').click()
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-name"]').type('Permissions account')
      cy.get('[data-test-id="input-handle"]').type('permissions_account')
      cy.get('[data-test-id="button-submit"]').click()
      cy.get('[data-test-id="input-new-password"]').type(newPassword, { force: true })
      cy.get('[data-test-id="input-confirm-password"]').type(newPassword, { force: true })
      cy.get('.card-footer:last').within(() => {
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.wait(1000)
    })
  })
})
