/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Test for assigning a role to a user', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for assigning a role to a user', () => {
    it('should be able to assign a role to a user', () => {
      cy.visit(adminURL + '/')
      // We wait for 2s in order the page to be fully loaded/rendered
      cy.wait(2000)
      cy.get('.nav-sidebar').contains('Users').click()
      cy.contains('Permissions account').get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('.input-group').type('Test')
      cy.get('.filtered-role').click()
      cy.get('.card-footer:eq(1)').within(() => {
        cy.get('[data-test-id="button-submit"]').click()
      })
    })
  })
})
