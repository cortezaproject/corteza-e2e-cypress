/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')
const newEmail = Cypress.env('USER_EMAIL_NEW')

describe('Testing permissions of a template', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test template permissions', () => {
    it('should be able to add a role for evaluation and adjust permissions', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/template/?query=&handle=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('templates')
      cy.intercept('/api/system/template/?query=test&handle=&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/template"]').click({ force: true })
      cy.wait('@templates')
      cy.get('[data-test-id="input-search"]').type('test')
      cy.wait('@search')
      cy.contains('test').get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-permissions"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="select-user-list-roles"]').type('Security administrator{enter}')
      cy.get('[data-test-id="icon-add"]').click()
      cy.get('[data-test-id="select-user"]').type('Permissions account{enter}')
      cy.get('.modal-footer').contains('Save & Close').click({ force: true })
      cy.contains('Cancel').click({ force: true })
    })
    
    it('should be able to adjust permissions', () => {
      cy.intercept('/api/system/template/?query=&handle=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('templates')
      cy.get('.nav-sidebar').find('a[href="/system/template"]').click({ force: true })
      cy.wait('@templates')
      cy.get('[data-test-id="button-permissions"]').click({ force: true })
      cy.get('[data-test-id="toggle-role-permissions"]:first input[value="deny"]').click({ force: true })
      cy.get('footer').contains('Save changes').click({ force: true })
    })

    it('should be able to login with the limited permissions account and check if permissions are applied', () => {
      cy.intercept('/api/system/template/?query=&handle=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('templates')
      cy.get('[data-test-id="dropdown-profile"]').click({ force: true })
      cy.get('[data-test-id="dropdown-profile-logout"]').click({ force: true })
      cy.get('[data-test-id="link-login"]').click({ force: true })
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click({ force: true })
      cy.get('.nav-sidebar').find('a[href="/system/template"]').click({ force: true })
      cy.wait('@templates')
      // Roles should not be displayed hence the message "No matches for your search"
      cy.get('[data-test-id="no-matches"]').should('exist')
    })
  })
})
