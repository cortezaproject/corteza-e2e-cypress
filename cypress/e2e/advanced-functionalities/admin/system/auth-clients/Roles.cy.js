/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for checking role inputs', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for checking role inputs', () => {
    it('should be able to include a permitted role', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/auth/clients/?deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('auth-clients')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/authClient"]').click({ force: true })
      cy.wait('@auth-clients')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).contains('test_auth_client').click({ force: true })
      cy.get('[data-test-id="permitted-roles"]').within(() => {
        cy.get('[data-test-id="input-role-picker"]').type('Security administrator{enter}')
      })
    })

    it('should be able to include a prohibited role', () => {
      cy.get('[data-test-id="prohibited-roles"]').within(() => {
        cy.get('[data-test-id="input-role-picker"]').type('Developer{enter}')
      })
    })

    it('should be able to include a forced role', () => {
      cy.get('[data-test-id="forced-roles"]').within(() => {
        cy.get('[data-test-id="input-role-picker"]').type('Federation{enter}')
      })
      cy.get('.card-footer > [data-test-id="button-submit"]').click()
    })

    it('should check whether the inputted roles are present', () => {
      cy.intercept('/api/system/auth/clients/?deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('auth-clients')
      cy.get('.nav-sidebar').find('a[href="/system/authClient"]').click({ force: true })
      cy.wait('@auth-clients')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).contains('test_auth_client').click({ force: true })
      cy.get('[data-test-id="selected-row-list"]:eq(0)', { timeout: 10000 }).should('exist', 'Security administrator')
      cy.get('[data-test-id="selected-row-list"]:eq(1)', { timeout: 10000 }).should('exist', 'Developer')
      cy.get('[data-test-id="selected-row-list"]:eq(2)', { timeout: 10000 }).should('exist', 'Federation')
    })
  })
})
