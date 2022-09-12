/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for assigning a member to a role', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for assigning a member to a role', () => {
    it('should be able to assign a member', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="input-search"]').type('advanced')
      // We wait 2s in order the search to be completed
      cy.wait(2000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-role-edit-members"]').within(() => {
        cy.get('[data-test-id="input-search"]').type('Permissions account')
        cy.get('[data-test-id="button-add-member"]').click()
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should check whether the member was assigned', () => {
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="input-search"]').type('advanced')
      // We wait 2s in order the search to be completed
      cy.wait(2000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-role-edit-members"]').within(() => {
        cy.contains('Permissions account').should('exist')
      })
    })
  })
})
