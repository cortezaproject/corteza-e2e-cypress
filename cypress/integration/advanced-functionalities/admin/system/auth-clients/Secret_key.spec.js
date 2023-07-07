/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for checking if secret key is generated', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for checking if secret key is generated', () => {
    it('should be able to generate a secret key', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/auth/clients/?deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('auth-clients')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/authClient"]').click({ force: true })
      cy.wait('@auth-clients')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).contains('test_auth_client').click({ force: true })
      cy.get('[data-test-id="input-client-secret"]').should('be.disabled')
      cy.get('[data-test-id="button-show-client-secret"]').click()
      cy.get('[data-test-id="button-regenerate-client-secret"]').click()
      cy.get('.card-footer > [data-test-id="button-submit"]').click()
    })
  })
})
