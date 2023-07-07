/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')
const newEmail = Cypress.env('USER_EMAIL_NEW')

describe('Testing permissions of an auth client', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Testing permissions of an auth client', () => {
    it('should be able to add a role for evaluation and adjust permissions', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/auth/clients/?deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('auth-clients')
      cy.intercept('/api/system/roles/').as('roles')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/authClient"]').click({ force: true })
      cy.wait('@auth-clients')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).contains('test_auth_client').click({ force: true })
      cy.get('[data-test-id="button-permissions"]', { timeout: 10000 }).click({ force: true })
      cy.wait('@roles')
      cy.get('.modal').should('exist')
      cy.get('[data-test-id="select-user-list-roles"]').type('Security administrator{enter}')
      cy.get('[data-test-id="icon-add"]').click({ force: true })
      cy.get('[data-test-id="select-user"]').type('Permissions account{enter}')
      cy.get('.modal-footer').contains('Save & Close').click({ force: true })
      cy.contains('Cancel').click({ force: true })
    })

    it('should be able to adjust permissions', () => {
      cy.intercept('/api/system/auth/clients/?deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('auth-clients')
      cy.intercept('/api/system/permissions/').as('permissions')
      cy.get('.nav-sidebar').find('a[href="/system/authClient"]').click({ force: true })
      cy.wait('@auth-clients')
      cy.get('[data-test-id="button-permissions"]', { timeout: 10000 }).click({ force: true })
      cy.wait('@permissions')
      cy.get('[data-test-id="toggle-role-permissions"]:first input[value="deny"]').click({ force: true })
      cy.get('footer').contains('Save changes').click({ force: true })
    })

    it('should be able to login with the limited permissions account and check if permissions are applied', () => {
      cy.intercept('/api/system/auth/clients/?deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('auth-clients')
      cy.get('[data-test-id="dropdown-profile"]').click({ force: true })
      cy.get('[data-test-id="dropdown-profile-logout"]').click({ force: true })
      cy.get('[data-test-id="link-login"]').click({ force: true })
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click({ force: true })
      cy.get('.nav-sidebar').find('a[href="/system/authClient"]').click({ force: true })
      cy.wait('@auth-clients')
      // Roles should not be displayed hence the message "No matches for your search"
      cy.get('[data-test-id="no-matches"]', { timeout: 10000 }).should('exist')
      cy.get('[data-test-id="dropdown-profile"]').click({ force: true })
      cy.get('[data-test-id="dropdown-profile-logout"]').click({ force: true })
    })
  })
})
