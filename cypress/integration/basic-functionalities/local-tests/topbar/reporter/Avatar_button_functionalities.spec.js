/// <reference types="cypress" />
const reporterURL = Cypress.env('REPORTER_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test avatar functionalities', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: reporterURL })
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
