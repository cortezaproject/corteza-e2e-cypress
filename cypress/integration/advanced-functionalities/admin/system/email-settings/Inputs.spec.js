/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')
const newEmail = Cypress.env('USER_EMAIL_NEW')

describe('Test for SMTP server functionalities', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Testing SMTP server inputs', () => {
    it('should be able to enter a server name', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Email settings').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="input-server"]').clear({ force: true }).type('default.host.domain.ltd', { force: true })
      cy.get('[data-test-id="button-submit"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should be able to enter a server port', () => {
      cy.get('[data-test-id="input-server-port"]').clear().type('25')
      cy.get('[data-test-id="button-submit"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should be able to enter user and password', () => {
      cy.get('[data-test-id="input-user"]').clear().type(newEmail)
      cy.get('[data-test-id="input-password"]').clear().type(newPassword)
      cy.get('[data-test-id="button-submit"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should be able to enter sender address', () => {
      cy.get('[data-test-id="input-sender-address"]').clear().type('sender@address.com')
      cy.get('[data-test-id="button-submit"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should be able to enter sender address', () => {
      cy.get('[data-test-id="checkbox-allow-invalid-certificates"]').check({ force: true })
      cy.get('[data-test-id="button-submit"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should be able to enter TLS server name', () => {
      cy.get('[data-test-id="input-tls-server-name"]').clear({ force: true }).type('default.domain.ltd', { force: true })
      cy.get('[data-test-id="button-submit"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
    })
  })
})
