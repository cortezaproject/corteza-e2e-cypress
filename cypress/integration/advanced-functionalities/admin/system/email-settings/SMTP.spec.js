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
    it('should be able to enter an info into the fields', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Email settings').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="input-server"]').clear({ force: true }).type('default.host.domain.ltd', { force: true })
      cy.get('[data-test-id="input-server-port"]').clear().type('one')
      cy.get('[data-test-id="input-server-port"]').should('not.have.value', 'one')
      cy.get('[data-test-id="input-server-port"]').clear().type('25')
      cy.get('[data-test-id="input-user"]').clear().type(newEmail)
      cy.get('[data-test-id="input-password"]').clear().type(newPassword)
      cy.get('[data-test-id="input-sender-address"]').clear().type('sender@address.com')
      cy.get('[data-test-id="checkbox-allow-invalid-certificates"]').check({ force: true })
      cy.get('[data-test-id="input-tls-server-name"]').clear({ force: true }).type('default.domain.ltd', { force: true })
      cy.get('[data-test-id="button-submit"]').click({ force: true })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should check whether the entered info is saved', () => {
      cy.get('[data-test-id="input-server"]').should('have.value', 'default.host.domain.ltd')
      cy.get('[data-test-id="input-server-port"]').should('have.value', '25')
      cy.get('[data-test-id="input-user"]').should('have.value', newEmail)
      cy.get('[data-test-id="input-password"]').should('have.value', newPassword)
      cy.get('[data-test-id="input-sender-address"]').should('have.value', 'sender@address.com')
      cy.get('[data-test-id="checkbox-allow-invalid-certificates"]').should('be.checked')
      cy.get('[data-test-id="input-tls-server-name"]').should('have.value', 'default.domain.ltd')
    })
  })

  context('Sending an email through SMTP button', () => {
    it('should be able to configure the server for sending an email', () => {
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="input-server"]').clear({ force: true }).type('localhost', { force: true })
      cy.get('[data-test-id="input-server-port"]').clear().type('1025')
      cy.get('[data-test-id="button-submit"]').click({ force: true })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should be able to send and receive the mail', () => {
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="button-smtp"]').click({ force: true })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      // We wait 1s in order the mail to be sent
      cy.wait(1000)
      // We check if the mail is received in MailHog
      cy.mhGetAllMails().should('have.length', 1)
    })
  })
})
