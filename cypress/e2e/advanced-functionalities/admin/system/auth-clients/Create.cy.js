/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating auth client', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for creating auth client', () => {
    it('should check if some labels and fields are hidden when in create mode', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/auth/clients/?deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('auth-clients')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/authClient"]').click({ force: true })
      cy.wait('@auth-clients')
      cy.get('[data-test-id="button-new-auth-client"]').click()
      cy.get('[data-test-id="input-client-secret"]').should('not.exist')
      cy.get('[data-test-id="input-uri"]').should('not.exist')
      cy.get('[data-test-id="select-user"]').should('not.exist')
      cy.get('[data-test-id="button-permissions"]').should('not.exist')
      cy.get('[data-test-id="button-delete"]').should('not.exist')
      // Check if Generate cURL snippet button is hidden
      cy.get('[data-test-id="button-cURL-snippet"]').should('not.exist')
      cy.get('[data-test-id="cURL-string"]').should('not.exist')
      // Check if Hide cURLsnippet  button is hidden
      cy.get('[data-test-id="button-cURL-snippet"]').should('not.exist')
      cy.get('[data-test-id="button-new-auth-client"]').should('not.exist')
      cy.get('[data-test-id="created-at"]').should('not.exist')
      cy.get('[data-test-id="updated-at"]').should('not.exist')
      cy.get('[data-test-id="deleted-at"]').should('not.exist')
      cy.get('[data-test-id="button-undelete"]').should('not.exist')
    })

    it('should be able to create an auth client', () => {
      cy.get('[data-test-id="input-name"]').type('Test auth client')
      cy.get('[data-test-id="input-handle"]').type('test_auth_client')
      cy.get('.card-footer > [data-test-id="button-submit"]').click()
      cy.get('[data-test-id="input-created-at"]').should('exist')
    })
  })
})
