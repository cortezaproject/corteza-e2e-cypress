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
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="input-search"]').type('Test')
      // We wait 2s in order the search to be completed
      cy.wait(2000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="button-clone"]').click()
      cy.get('[data-test-id="select-role-list"]').type('Advanced functionalities{enter}')
      cy.get('[data-test-id="modal-clone-permission"]').within(() => {
        cy.get('button').contains('Clone').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })
  })

  context('Test role permissions', () => {
    it('should be able to add a role for evaluation and adjust permissions', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Roles').click()
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="input-search"]').type('advanced')
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.contains('Advanced functionalities').get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="button-permissions"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="select-user-list-roles"]').type('Security administrator{enter}')
      cy.get('[data-test-id="icon-add"]').click()
      cy.get('[data-test-id="select-user"]').type('Permissions account{enter}')
      cy.get('.modal-footer').contains('Save & Close').click()
      cy.contains('Cancel').click()
    })
    
    it('should be able to adjust permissions', () => {
      cy.get('.nav-sidebar').contains('Roles').click()
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="button-permissions"]').click()
      cy.get('[data-test-id="select-user-list-roles"]').type('Security administrator{enter}')
      // We select Deny for read any namespace permission
      cy.get('[data-test-id="toggle-role-permissions"]:first').contains('Deny').click()
      cy.get('footer').contains('Save changes').click()
    })

    it('should be able to login with the limited permissions account and check if permissions are applied', () => {
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click()
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Roles').click()
      // Roles should not be displayed hence the message "No matches for your search"
      cy.get('[data-test-id="no-matches"]').should('exist')
    })
  })
})
