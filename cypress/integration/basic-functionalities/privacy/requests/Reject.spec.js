/// <reference types="cypress" />
const privacyURL = Cypress.env('PRIVACY_URL')
const dpoEmail = Cypress.env('USER_DPO')
const dpoPassword = Cypress.env('USER_DPO_PASSWORD')

describe('Test for rejecting a request', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email: dpoEmail, password: dpoPassword, url: privacyURL })
    }
  })

  context('Test for rejected a request after visiting it', () => {
    it('should be able to', () => {
      cy.get('[data-test-id="button-home"]').click()
      cy.get('a[href="/request/list"]').click()
      cy.get('#resource-list tbody tr:nth-child(3) td:nth-child(2)', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="button-delete"].btn-danger').click()
      cy.get('[data-test-id="button-delete-cancel"]').click()
      cy.get('[data-test-id="button-delete"].btn-danger').click()
      cy.get('[data-test-id="button-delete-confirm"]', { timeout: 10000 }).click()
    })

    it('should be rejected', () => {
      cy.get('#resource-list tbody tr:nth-child(3) td:nth-child(2)', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="badge-rejected"]').should('exist')
      cy.get('[data-test-id="button-delete"].btn-primary').should('be.disabled')
      cy.get('[data-test-id="button-delete"].btn-danger').should('be.disabled')
    })
  })

  context('Test for rejecting a request from the list of requests', () => {
    it('should be able to', () => {
      cy.get('[data-test-id="button-home"]').click()
      cy.get('a[href="/request/list"]').click()
      cy.get('.card-header').within(() => {
      cy.get('[data-test-id="button-delete"].btn-primary').should('be.disabled')
      cy.get('[data-test-id="button-delete"].btn-danger').should('be.disabled')
        cy.get('[data-test-id="input-search"]').clear().type('pending')
      })
      cy.get('#resource-list > tbody > tr:first > td:first > div > [type="checkbox"]').check({ force: true })
      cy.get('.card-header').within(() => {
        cy.get('[data-test-id="button-delete"].btn-danger').click()
      })
      cy.get('[data-test-id="button-delete-confirm"]').click()
    })

    it('should be rejected', () => {
      cy.get('[data-test-id="button-home"]').click()
      cy.get('a[href="/request/list"]').click()
      cy.get('[data-test-id="input-search"]').clear().type('rejected')
      cy.get('#resource-list > tbody > tr').should('have.length', 2)
      cy.get('[data-test-id="button-delete"].btn-primary').should('be.disabled')
      cy.get('[data-test-id="button-delete"].btn-danger').should('be.disabled')
    })
  })
})
