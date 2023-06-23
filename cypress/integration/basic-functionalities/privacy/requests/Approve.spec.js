/// <reference types="cypress" />
const privacyURL = Cypress.env('PRIVACY_URL')
const dpoEmail = Cypress.env('USER_DPO')
const dpoPassword = Cypress.env('USER_DPO_PASSWORD')

describe('Test for approving a request', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email: dpoEmail, password: dpoPassword, url: privacyURL })
    } else {
      cy.visit(privacyURL)
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.login({ email: dpoEmail, password: dpoPassword, url: privacyURL })
    }
  })

  context('Test for approving a request after visiting it', () => {
    it('should be able to', () => {
      cy.get('a[href="/request/list"]').click({ force: true })
      cy.get('[data-test-id="input-search"]').type('pending')
      cy.get('#resource-list tbody tr:nth-child(2) td:nth-child(2)', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('button').contains('Approve request').click()
      cy.get('.btn-secondary').click()
      cy.get('button').contains('Approve request').click()
      cy.get('.btn-primary:nth-child(1)').click()
    })

    it('should be approved', () => {
      cy.get('#resource-list tbody tr:nth-child(2) td:nth-child(2)', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="badge-approved"]').should('exist')
      cy.get('button').contains('Approve request').should('be.disabled')
      cy.get('button').contains('Reject request').should('be.disabled')
    })
  })

  context('Test for approving a request from the list of requests', () => {
    it('should be able to', () => {
      cy.get('[data-test-id="button-home"]').click()
      cy.get('a[href="/request/list"]').click()
      cy.get('.card-header').within(() => {
        cy.get('button').contains('Approve Requests').should('be.disabled')
        cy.get('button').contains('Reject Requests').should('be.disabled')
        cy.get('[data-test-id="input-search"]').type('pending')
      })
      cy.get('#resource-list > tbody > tr:first > td:first > div > [type="checkbox"]').check({ force: true })
      cy.get('.card-header').within(() => {
        cy.get('button').contains('Approve Request').click()
        cy.get('[data-test-id="button-delete-confirm"]').click()
      })
    })

    it('should be approved', () => {
      cy.get('[data-test-id="button-home"]').click()
      cy.get('a[href="/request/list"]').click()
      cy.get('[data-test-id="input-search"]').type('approved')
      cy.get('#resource-list > tbody > tr').should('have.length', 2)
      cy.get('.btn-primary').contains('Approve Requests').should('be.disabled')
      cy.get('.btn-danger').contains('Reject Requests').should('be.disabled')
    })
  })
})
