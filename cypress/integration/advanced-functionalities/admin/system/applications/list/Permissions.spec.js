/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Testing permissions in admin applications', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Testing permissions in admin applications', () => {
    it('should be able to deny permissions for a specific role', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Applications').click()
      // We wait for 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="button-permissions"]').click()
      // We wait for 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="select-user-list-roles"]').type('Security administrator{enter}')
      // We wait for 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="toggle-role-permissions"]:first').contains('Deny').click()
      cy.get('footer').contains('Save changes').click({ force: true })
    })

    it('should be able to log in with the limited permissions account and check if it has restrictions', () => {
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click()
      // Since we don't have permissions, we won't be even able to access admin
      cy.get('[data-test-id="no-matches"]').should('exist')
    })
  })
})
