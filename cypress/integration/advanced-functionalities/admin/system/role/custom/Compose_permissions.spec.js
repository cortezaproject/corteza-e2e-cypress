/// <reference types="cypress" />
const composeURL = Cypress.env('webappLink').composeURL
const email = Cypress.env('user').email
const newEmail = Cypress.env('user').newEmail
const password = Cypress.env('user').password
const newPassword = Cypress.env('user').newPassword

describe('Testing compose permissions', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: composeURL })
    }
  })

  context('Testing permissions', () => {
    it('should be able to log in with the limited permissions account and check if it has restrictions', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-permissions"]').click()
      cy.get('.list-group').contains('Test').click()
      // We select Deny for delete any namespace permission
      cy.get('.modal-content > .modal-body > form > div > .rule-list > .container > :nth-child(3)').contains('Deny').click()
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('.close').click()
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click()
      // We check with this that the edit button is missing, hence the profile doesn't have permissions
      cy.get('[data-test-id="button-edit-namespace"]').should('not.exist')
    })
  })
})
