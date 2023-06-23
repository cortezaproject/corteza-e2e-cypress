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
      cy.get('[data-test-id="input-search"]').clear().type('pending')
      cy.get('#resource-list tr:last').should('exist').click({ force: true })
      cy.get('button').contains('Cancel request').click()
      cy.get('.btn-secondary').click()
      cy.get('button').contains('Cancel request').click()
      cy.get('.btn-danger').click()
    })

    it('should be canceled', () => {
      cy.get('[data-test-id="input-search"]').clear().type('canceled')
      cy.get('#resource-list tr:last').click({ force: true })
      cy.get('[data-test-id="badge-canceled"]').should('exist')
      cy.get('button').contains('Cancel request').should('be.disabled')
    })
  })

  context('Test for canceling a request from the list of requests', () => {
    it('should be able to', () => {
      cy.get('[data-test-id="button-home"]').click()
      cy.get('a[href="/request/list"]').click()
      cy.get('.card-header').within(() => {
        cy.get('[data-test-id="button-delete"]').should('be.disabled')
        cy.get('[data-test-id="input-search"]').clear().type('pending')
      })
      cy.get('#resource-list > tbody > tr:first > td:first > div > [type="checkbox"]').check({ force: true })
      cy.get('.card-header').within(() => {
        cy.get('button').contains('Cancel Request').click()
      })
      cy.get('.btn-danger').click()
    })

    it('should be canceled', () => {
      cy.get('[data-test-id="button-home"]').click()
      cy.get('a[href="/request/list"]').click()
      cy.get('[data-test-id="input-search"]').type('canceled')
      cy.get('#resource-list > tbody > tr').should('have.length', 2)
      cy.get('button').contains('Cancel Request').should('be.disabled')
    })
  })
})
