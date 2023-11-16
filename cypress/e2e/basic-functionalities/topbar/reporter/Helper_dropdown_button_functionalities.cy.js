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

  context('Test for checking if forum page can be accessed', () => {
    it('should be accessible', () => {
      cy.get('[data-test-id="dropdown-helper-forum"]').url('exist', 'https://forum.cortezaproject.org')
    })
  })

  context('Test for checking if the documentation page can be accessed', () => {
    it('should be accessible', () => {
      cy.get('[data-test-id="dropdown-helper-docs"]').url('include', '/docs')
    })
  })

  context('Test for checking if the send feedback link can be accessed', () => {
    it('should be accessible', () => {
      cy.get('[data-test-id="dropdown-helper-feedback"]').url('exist', 'mailto:info@cortezaproject.org')
    })
  })
})
