/// <reference types="cypress" />
const adminURL = Cypress.env('webappLink').adminURL
const email = Cypress.env('user').email
const newEmail = Cypress.env('user').newEmail
const password = Cypress.env('user').password
const newPassword = Cypress.env('user').newPassword

describe('Test for assigning a role to a user', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: adminURL })
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
