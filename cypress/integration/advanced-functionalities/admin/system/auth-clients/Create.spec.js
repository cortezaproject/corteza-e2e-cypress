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
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Auth Clients').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="button-new-auth-client"]').click()
      cy.get('[data-test-id="input-client-secret"]').should('not.exist')
      cy.get('[data-test-id="input-uri"]').should('not.exist')
      cy.get('[data-test-id="select-user"]').should('not.exist')
      cy.get('[data-test-id="button-permissions"]').should('not.exist')
      cy.get('[data-test-id="button-delete"]').should('not.exist')
      cy.contains('Generate').should('not.exist')
      cy.get('[data-test-id="cURL"]').should('not.exist')
      cy.contains('Hide cURL').should('not.exist')
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
      cy.get('[data-test-id="created-at"]').should('exist')
    })
  })
})
