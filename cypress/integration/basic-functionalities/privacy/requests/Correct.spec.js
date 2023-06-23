/// <reference types="cypress" />
const privacyURL = Cypress.env('PRIVACY_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for requesting to correct data in a compose record', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: privacyURL })
    }
  })

  context('Test for requesting to correct data from within a request', () => {
    it('should be able to', () => {
      cy.get('a[href="/request/list"]').click({ force: true })
      cy.get('[data-test-id="button-home"]').click({ force: true })
      cy.get('a[href="/data-overview"]').click({ force: true })
      cy.visit(`${privacyURL}/data-overview/application`)
      cy.get('[data-test-id="button-request-correction"]').click()
      cy.get('input[type="text"]').clear().type('Request correction')
      cy.get('[data-test-id="button-submit-correction-request"]').click()
      cy.get('.card-body p:nth-child(1)').contains('Request correction')
    })
  })
})
