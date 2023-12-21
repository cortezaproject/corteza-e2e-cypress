/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')
const newEmail = Cypress.env('USER_EMAIL_NEW')

describe('Testing contextual role', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Testing contextual role', () => {
    it('should be able to assign a role to a user', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/users/?query=Permissions+account&deleted=0&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/user"]').click({ force: true })
      cy.get('[data-test-id="filter-deleted-users"]').should('exist')
      cy.get('[data-test-id="input-search"]').type('Permissions account')
      cy.wait('@search')
      cy.contains('Permissions account').get('#resource-list > tbody > tr:last').click({ force: true })
      cy.get('[data-test-id="card-role-membership"]').within(() => {
        cy.get('[data-test-id="input-role-picker"]').type('Security administrator{enter}')
        cy.get('[data-test-id="button-submit"]').click()
      })
    })

    it('should create a contextual role and set it to true', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/role"]').click({ force: true })
      cy.get('[data-test-id="filter-deleted-roles"]').should('exist')
      cy.get('[data-test-id="button-new-role"]').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('Contextual')
        cy.get('[data-test-id="input-handle"]').type('Contextual')
        cy.get('[data-test-id="checkbox-is-contextual"] input').check({ force: true })
        cy.get('[data-test-id="input-expression"]').should('exist').type('true')
        cy.get('[data-test-id="checkbox-resource-type-system:role"]').check({ force: true })
        cy.get('[data-test-id="button-submit"]').click({ force: true })
      })
      cy.get('[data-test-id="card-role-edit-members"]').should('not.exist')
    })

    it('should adjust the permissions of the role', () => {
      cy.get('.nav-sidebar').find('a[href="/system/role"]').click({ force: true })
      cy.get('[data-test-id="button-permissions"]').click({ force: true })
      cy.get('[data-test-id="select-user-list-roles"]', { timeout: 10000 })
        .type('Security administrator{enter}')
      cy.get('[data-test-id="toggle-role-permissions"]:first input[value="deny"]', { timeout: 10000 })
        .click({ force: true })
      cy.get('[data-test-id="button-save"]').click({ force: true })
    })

    it('should not be able to see any roles when expression is set to true', () => {
      cy.get('[data-test-id="dropdown-profile"]').click({ force: true })
      cy.get('[data-test-id="dropdown-profile-logout"]').click({ force: true })
      cy.get('[data-test-id="link-login"]').click({ force: true })
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click({ force: true })
      cy.get('.nav-sidebar').find('a[href="/system/role"]').click({ force: true })
      cy.get('[data-test-id="filter-deleted-roles"]').should('exist')
      // Roles should not be displayed hence the message "No matches for your search"
      cy.get('[data-test-id="no-matches"]').should('exist')
    })

    it('should be able to set the expression to false', () => {
      cy.intercept('/api/system/users/?query=&limit=15').as('load')
      cy.intercept('/api/system/roles/?query=Contextual&deleted=0&archived=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('role')
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.get('[data-test-id="input-email"]').type(email)
      cy.get('[data-test-id="input-password"]').type(password)
      cy.get('[data-test-id="button-login-and-remember"]').click()
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/role"]').click({ force: true })
      cy.get('[data-test-id="filter-deleted-roles"]').should('exist')
      cy.get('[data-test-id="input-search"]').type('Contextual')
      cy.wait('@role')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-expression"]').clear().type('false')
        cy.get('[data-test-id="button-submit"]').click()
      })
    })

    it('should adjust the permissions of the role', () => {
      cy.get('.nav-sidebar').find('a[href="/system/role"]').click({ force: true })
      cy.get('[data-test-id="button-permissions"]').click()
      cy.get('[data-test-id="select-user-list-roles"]').type('Security administrator{enter}')
      cy.get('[data-test-id="toggle-role-permissions"]:first input[value="allow"]').click({ force: true })
      cy.get('footer').contains('Save changes').click({ force: true })
    })

    it('should be able to see roles when expression is set to false', () => {
      cy.intercept('/api/system/users/?query=&limit=15').as('load')
      cy.intercept('/api/system/roles/?query=Contextual&deleted=0&archived=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('role')
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click()
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/role"]').click({ force: true })
      cy.get('[data-test-id="filter-deleted-roles"]').should('exist')
      cy.get('[data-test-id="input-search"]').type('Contextual')
      cy.wait('@role')
      cy.get('#resource-list').contains('Contextual').should('exist')
    })
  })
})
