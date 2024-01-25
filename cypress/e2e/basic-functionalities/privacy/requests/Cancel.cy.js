/// <reference types="cypress" />
const privacyURL = Cypress.env('PRIVACY_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for canceling an export data request', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: privacyURL })
    }
  })

  context('Test for canceling a request from within the request itself', () => {
    it('should be able to', () => {
      cy.get('a[href="/request/list"]').click({ force: true })
      cy.get('#resource-list tr:nth-child(1) td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-cancel"]').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]', { timeout: 10000 }).click()
    })

    it('should be canceled', () => {
      cy.get('#resource-list > tbody > tr:first > td:first > div > [type="checkbox"]', { timeout: 10000 }).should('not.exist')
      cy.get('#resource-list tr:nth-child(1) td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="badge-canceled"]').should('exist')
      cy.get('[data-test-id="button-delete"]').should('be.disabled')
    })
  })

  context('Test for canceling a request from the list of requests', () => {
    it('should be able to', () => {
      cy.get('[data-test-id="button-home"]').click({ force: true })
      cy.get('a[href="/request/list"]').click({ force: true })
      cy.get('.card-header').within(() => {
        cy.get('[data-test-id="button-delete"]').should('be.disabled')
        cy.searchItem({ item: 'pending' })
      })
      cy.get('#resource-list > tbody > tr:first > td:first > div > [type="checkbox"]').check({ force: true })
      cy.get('.card-header').within(() => {
        cy.get('[data-test-id="button-delete"]').click({ force: true })
      })
      cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
    })

    it('should be canceled', () => {
      cy.get('[data-test-id="button-home"]').click({ force: true })
      cy.get('a[href="/request/list"]').click({ force: true })
      cy.searchItem({ item: 'canceled' })
      cy.get('#resource-list > tbody > tr').should('have.length', 2)
      cy.get('[data-test-id="button-delete"]').should('be.disabled')
    })
  })
})
