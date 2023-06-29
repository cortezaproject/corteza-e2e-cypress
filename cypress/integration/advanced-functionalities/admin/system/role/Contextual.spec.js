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
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Users').click()
      cy.get('[data-test-id="input-search"]').type('Permissions account')
      // We wait for 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.contains('Permissions account').get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('.input-group').type('Security administrator')
      cy.get('.filtered-role').click()
      // We wait for 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('.card-footer:eq(1)').within(() => {
        // We wait for 1s in order the page to be fully loaded
        cy.wait(1000)
        cy.get('[data-test-id="button-submit"]').click()
        // We wait for 2s in order the page to be fully loaded
        cy.wait(2000)
      })
    })

    it('should create a contextual role and set it to true', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="button-new-role"]').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('Contextual')
        cy.get('[data-test-id="input-handle"]').type('Contextual')
        cy.get('[data-test-id="checkbox-is-contextual"]').check({ force: true })
        // We wait 1s in order the page to be fully loaded
        cy.wait(1000)
        cy.get('[data-test-id="input-expression"]').type('true')
        cy.get('[data-test-id="checkbox-resource-types-list"]').within(() => {
          cy.get('.custom-control-input:eq(1)').check({ force: true })
        })
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('[data-test-id="card-role-edit-members"]').should('not.exist')
    })

    it('should adjust the permissions of the role', () => {
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="button-permissions"]').click()
      cy.get('[data-test-id="select-user-list-roles"]').type('Security administrator{enter}')
      cy.get('[data-test-id="toggle-role-permissions"]:first').contains('Deny').click()
      cy.get('footer').contains('Save changes').click({ force: true })
    })

    it('should not be able to see any roles when expression is set to true', () => {
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click()
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Roles').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      // Roles should not be displayed hence the message "No matches for your search"
      cy.get('[data-test-id="no-matches"]').should('exist')
    })

    it('should be able to set the expression to false', () => {
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.get('[data-test-id="input-email"]').type(email)
      cy.get('[data-test-id="input-password"]').type(password)
      cy.get('[data-test-id="button-login-and-remember"]').click()
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="input-search"]').type('Contextual')
      // We wait 2s in order the search to be completed
      cy.wait(2000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-expression"]').clear().type('false')
        cy.get('[data-test-id="button-submit"]').click()
      })
    })

    it('should adjust the permissions of the role', () => {
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="button-permissions"]').click()
      cy.get('[data-test-id="select-user-list-roles"]').type('Security administrator{enter}')
      cy.get('[data-test-id="toggle-role-permissions"]:first').contains('Allow').click()
      cy.get('footer').contains('Save changes').click({ force: true })
    })

    it('should be able to see roles when expression is set to false', () => {
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click()
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="input-search"]').type('Contextual')
      // Roles should not be displayed hence the message "No matches for your search"
      cy.get('#resource-list').contains('Contextual')
    })
  })
})
