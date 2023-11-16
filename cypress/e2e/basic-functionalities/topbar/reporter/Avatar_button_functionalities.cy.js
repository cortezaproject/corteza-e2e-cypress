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

  context('Test for checking logged in user', () => {
    it('should be able to see username', () => {
      cy.get('[data-test-id="dropdown-profile"]').click({ force: true })
      cy.get('[data-test-id="dropdown-item-username"]').contains('Cypress test account')
    })
  })

  context('Test for checking if the user can access profile in auth page', () => {
    it('should be able to visit profile', () => {
      cy.get('[data-test-id="dropdown-profile-user"]').url('exist', '/auth')
    })
  })

  context('Test for checking if the user can change password in auth page', () => {
    it('should be able to visit change password page', () => {
      cy.get('[data-test-id="dropdown-profile-change-password"]').url('exist', '/auth/change-password')
    })
  })

  context('Test for logging out the user', () => {
    it('should be able to log out', () => {
      cy.get('[data-test-id="dropdown-profile-logout"]').click({ force: true })
    })
  })
})
