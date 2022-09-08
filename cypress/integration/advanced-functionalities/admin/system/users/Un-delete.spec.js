/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for un-deleting a user', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for un-deleting a user', () => {
    it('should be able to un-delete a user', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Users').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="filter-deleted-users"]').contains('Only').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="input-search"]').type('Permissions')
      // We wait 1s for the search to finish
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="button-undelete"]').click()
      cy.get('.confirmation-confirm').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.get('[data-test-id="input-deleted-at"]').should('not.exist')
    })
    
    it('should be able to test deleted filter', () => {
      cy.get('.nav-sidebar').contains('Users').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="input-search"]').type('Permissions')
      // We wait 1s for the search to finish
      cy.wait(1000)
      // We check that the Deleted state doesn't exist
      cy.contains('Permissions account').get('#resource-list > tbody').contains('Deleted').should('not.exist')
      // We check that the text is not gray
      cy.contains('Permissions account').get('.text-secondary').should('not.exist')
      cy.get('[data-test-id="filter-deleted-users"]').contains('Only').click()
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.contains('Permissions account').should('not.exist')
    })
  })
})
