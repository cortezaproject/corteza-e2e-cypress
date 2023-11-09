/// <reference types="cypress" />
const privacyURL = Cypress.env('PRIVACY_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for requesting to delete data in a compose record', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: privacyURL })
    }
  })

  context('Test for creating a deletion request from the data deletion component', () => {
    it('should be able to', () => {
      cy.visit(privacyURL)
      cy.get('a[href="/request/delete/new"]').click()
      cy.get('[data-test-id="button-delete-selected-data"]').should('be.disabled')
      cy.get('[type="checkbox"]').check({ force: true })
      cy.get('[data-test-id="button-delete-selected-data"]').click()
    })

    it('should have the correct data', () => {
      cy.get('[data-test-id="badge-pending"]').should('exist')
      cy.get('[data-test-id="request-author"]').contains('Cypress test account')
      cy.get('button').contains('Cancel request').should('be.enabled')
    })
  })

  context('Test for creating a deletion request from the data overview component', () => {
    it('should be able to', () => {
      cy.get('[data-test-id="button-home"]').click()
      cy.get('a[href="/data-overview"]').click()
      cy.visit(`${privacyURL}/data-overview/application`)
      cy.get('[data-test-id="button-request-deletion"]').click()
      cy.get('[type="checkbox"]').check({ force: true })
      cy.get('[data-test-id="button-delete-selected-data"]').click()
    })
  })
})
