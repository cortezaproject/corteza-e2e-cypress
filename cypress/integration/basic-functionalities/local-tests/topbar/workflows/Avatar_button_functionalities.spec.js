/// <reference types="cypress" />
const workflowURL = Cypress.env('webappLink').workflowURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test avatar functionalities', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: workflowURL })
    }
  })

  context('Test for checking which user is logged in', () => {
    it('should be able to see which user is logged in', () => {
      cy.get('[data-test-id="dropdown-profile"]').click()
    })
  })

  context('Test for redirecting the user to the auth page', () => {
    it('should be able to click on the profile button and be redirected to the auth page', () => {
      cy.get('[data-test-id="dropdown-profile-user"]').click()
    })
  })

  context('Test for redirecting the user to change password auth page', () => {
    it('should be able to click on the change password button and be redirected to the auth page', () => {
      cy.get('[data-test-id="dropdown-profile-change-password"]').click({ force: true })
    })
  })

  context('Test for logging out the user', () => {
    it('should be able to log out', () => {
      cy.get('[data-test-id="dropdown-profile-logout"]').click({ force: true })
    })
  })
})
