/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Testing compose permissions', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Testing permissions', () => {
    it('should be able to log in with the limited permissions account and check if it has restrictions', () => {
      cy.intercept('/api/compose/namespace/').as('load')
      cy.visit(composeURL + '/namespaces')
      cy.wait('@load')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="button-permissions"]').click()
      cy.get('[data-test-id="select-user-list-roles"]').type('Test{enter}')
      // We select Deny for read any namespace permission
      cy.get('[data-test-id="toggle-role-permissions"]:first').contains('Deny').click()
      cy.contains('Save changes').click({ force: true })
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click()
      // We check with this that there are no namespaces present, hence the profile doesn't have permissions
      cy.get('[data-test-id="button-manage-namespaces"]').should('not.exist')
      cy.get('[data-test-id="button-edit-namespace"]').should('not.exist')
      cy.contains('No namespaces found').should('not.exist')
    })
  })
})
