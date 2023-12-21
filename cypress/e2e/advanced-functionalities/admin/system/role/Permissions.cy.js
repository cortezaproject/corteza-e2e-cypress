/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')
const newEmail = Cypress.env('USER_EMAIL_NEW')

describe('Testing permissions of a role', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Testing permissions of a role', () => {
    it('should be able to clone permissions', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/roles/?query=Test&deleted=0&archived=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('search')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/role"]').click({ force: true })
      cy.get('[data-test-id="filter-deleted-roles"]').should('exist')
      cy.get('[data-test-id="input-search"]').type('Test')
      cy.wait('@search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-clone"]').click()
      cy.get('[data-test-id="select-role-list"]').type('Advanced functionalities{enter}')
      cy.get('[data-test-id="modal-clone-permission"]').within(() => {
        cy.get('button').contains('Clone').should('exist').click()
      })
    })
  })

  context('Test role permissions', () => {
    it('should be able to add a role for evaluation and adjust permissions', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/roles/?query=advanced&deleted=0&archived=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/role"]').click({ force: true })
      cy.get('[data-test-id="filter-deleted-roles"]').should('exist')
      cy.get('[data-test-id="input-search"]').type('advanced')
      cy.wait('@search')
      cy.contains('Advanced functionalities').get('#resource-list > tbody > tr:last').click()
      cy.get('[data-test-id="button-permissions"]', { timeout: 10000 }).click()
      cy.contains('Set permissions').should('exist')
      cy.get('[data-test-id="select-user-list-roles"]').type('Security administrator{enter}')
      cy.get('[data-test-id="icon-add"]').click()
      cy.get('[data-test-id="select-user"]').type('Permissions account{enter}')
      cy.get('[data-test-id="button-save"]').eq(1).click({ force: true })
    })

    it('should be able to adjust permissions', () => {
      cy.get('.nav-sidebar').find('a[href="/system/role"]').click({ force: true })
      cy.get('[data-test-id="filter-deleted-roles"]').should('exist')
      cy.get('[data-test-id="button-permissions"]', { timeout: 10000 })
        .should('exist')
        .click({ force: true })
        cy.get('[data-test-id="select-user-list-roles"]', { timeout: 10000 })
        .should('exist')
        .type('Security administrator')
        .should('exist')
        // We select Deny for read any namespace permission
      cy.get('[data-test-id="toggle-role-permissions"]:first input[value="deny"]').click({ force: true })
      cy.get('[data-test-id="button-save"]').click({ force: true })
    })

    it('should be able to login with the limited permissions account and check if permissions are applied', () => {
      cy.intercept('/api/system/users/?query=&limit=15').as('load')
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click()
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/role"]').click({ force: true })
      cy.get('[data-test-id="filter-deleted-roles"]').should('exist')
      // Roles should not be displayed hence the message "No matches for your search"
      cy.get('[data-test-id="no-matches"]').should('exist')
    })
  })
})
