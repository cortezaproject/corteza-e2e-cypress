/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for managing external providers of a user', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for managing external providers of a user', () => {
    it('should be able to have external provider of type password', () => {
      cy.visit(adminURL + '/')
      // We wait for 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('.nav-sidebar').contains('Users').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      // We click on the edit icon on the Permissions account
      cy.contains('Permissions account').get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-external-auth-providers"]').within(() => {
        cy.contains('password').should('exist')
      })
    })

    it('should create new user from admin so it will not have external provider present', () => {
      cy.get('.nav-sidebar').contains('Users').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="button-new-user"]').click()
      cy.get('[data-test-id="input-email"]').clear().type('auth@email.com')
      cy.get('[data-test-id="input-name"]').clear().type('auth account')
      cy.get('[data-test-id="input-handle"]').clear().type('auth_account')
      cy.get('[data-test-id="button-submit"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.get('[data-test-id="card-external-auth-providers"]').within(() => {
        cy.contains('password').should('not.exist')
      })
    })
  })
})
