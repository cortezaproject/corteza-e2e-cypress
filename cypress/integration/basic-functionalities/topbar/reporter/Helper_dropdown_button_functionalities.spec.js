/// <reference types="cypress" />
const reporterURL = Cypress.env('REPORTER_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test helper dropdown functionalities', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: reporterURL })
    }
  })

  context('Test for opening up the forum page', () => {
    it('should be able to access the forum page', () => {
      cy.get('[data-test-id="dropdown-helper-forum"]').click({ force: true })
    })
  })

  context('Test for opening up the documentation page', () => {
    it('should be able to open corteza documentation', () => {
      cy.get('[data-test-id="dropdown-helper-docs"]').click({ force: true })
    })
  })

  context('Test for using the send feedback feature', () => {
    it('should be able to use the send feedback feature', () => {
      // We wait for 10s in order the send feedback feature to be fully loaded and open in separate modal
      cy.get('[data-test-id="dropdown-helper-feedback"]').should('exist')
    })
  })
})
