/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Test for checking system permissions', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for checking system permissions', () => {
    it('should be able to add a role for evaluation', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Permissions').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="button-add-role"]').click()
      cy.get('[data-test-id="select-edit-roles"]').type('Security administrator{enter}')
      cy.contains('Save & Close').click({ force: true })
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
    })

    it('should be able to restrict the permission to access all settings', () => {
      cy.get('[data-test-id="permission-settings.read"] > .active-cell').click()
      cy.get('.card-footer > [data-test-id="button-submit"]').click({ force: true })
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should be able to log in and check if the account is restricted from accessing all settings', () => {
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click()
      // We check if the Settings are shown in the sidebar and by that we check if the permissions were applied
      cy.get('.nav-sidebar').contains('Settings').should('not.exist')
    })
  })
})
