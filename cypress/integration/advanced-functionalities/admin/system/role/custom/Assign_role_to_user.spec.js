/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for assigning a role to a user', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for assigning a role to a user', () => {
    it('should be able to assign a role to a user', () => {
      cy.visit(adminURL + '/')
      // We wait for 4s in order the page to be fully loaded
      cy.wait(4000)
      cy.get('.nav-sidebar').contains('Users').click()
      cy.get('[data-test-id="input-search"]').type('Permissions account')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.contains('Permissions account').get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('.input-group').type('Test')
      cy.get('.filtered-role').click()
      cy.get('.card-footer:eq(1)').within(() => {
        cy.get('[data-test-id="button-submit"]').click()
      })
    })
  })
})
