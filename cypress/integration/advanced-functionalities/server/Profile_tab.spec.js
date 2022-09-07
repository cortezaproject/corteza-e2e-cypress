/// <reference types="cypress" />
const baseURL = Cypress.env('BASE_URL')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Testing your profile tab in server', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email: newEmail, password: newPassword, url: baseURL })
    }
  })

  context('Testing your profile tab', () => {
    it('should be able to change the name, handle and preferred language', () => {
      cy.visit(baseURL + '/auth/login')
      cy.get('[data-test-id="input-name"]').type(' edited')
      cy.get('[data-test-id="input-handle"]').type('_edited')
      cy.get('[data-test-id="select-language"]').select('German (German)')
      cy.get('[data-test-id="button-submit"]').click()
      // We check if the success toast appears
      cy.get('.border-primary')
    })

    it('should save the changes and check whether the values has been changed', () => {
      cy.get('[data-test-id="input-name"]').should('have.value', 'Permissions account edited')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'permissions_account_edited')
      cy.get('[data-test-id="select-language"]').should('exist', 'German (German)')
    })
  })
})
