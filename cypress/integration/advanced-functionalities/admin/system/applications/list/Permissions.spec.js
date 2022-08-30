/// <reference types="cypress" />
const adminURL = Cypress.env('webappLink').adminURL
const email = Cypress.env('user').email
const newEmail = Cypress.env('user').newEmail
const password = Cypress.env('user').password
const newPassword = Cypress.env('user').newPassword

describe('Testing permissions in admin applications', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: adminURL })
    }
  })

  context('Testing permissions in admin applications', () => {
    it('should be able to deny permissions for a specific role', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded/rendered
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="button-permissions"]').click()
      cy.get('.list-group').contains('Test').click()
      cy.get('.modal-content > .modal-body > form > div > .rule-list > .container > :nth-child(1)').contains('Deny').click()
      cy.get('[data-test-id="button-save"]').click()
    })

    it('should be able to log in with the limited permissions account and check if it has restrictions', () => {
      cy.get('.close').click({ force: true })
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click()
      // Since we don't have permissions, we won't be even able to access admin
      cy.get('.b-toast-danger').should('exist')
    })
  })
})
