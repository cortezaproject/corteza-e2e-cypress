/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a role with limited permissions', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for creating additional role', () => {
    it('should create a role that will have limited permissions', () => {
      cy.visit(adminURL + '/')
      // We wait for 4s in order the page to be fully loaded
      cy.wait(4000)
      cy.get('.nav-sidebar').contains('Roles').click()
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('[data-test-id="button-new-role"]').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('Test')
        cy.get('[data-test-id="input-handle"]').type('test')
        cy.get('[data-test-id="button-submit"]').click()
      })
    })
  })
})
