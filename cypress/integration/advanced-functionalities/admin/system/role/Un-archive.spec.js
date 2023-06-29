/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for un-archiving a role', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for un-archiving a role', () => {
    it('should be able to un-archiving a role', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Roles').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="filter-archived-roles"]').contains('Only').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="input-search"]').type('advanced')
      // We wait 1s for the search to finish
      cy.wait(1000)
      cy.contains('Advanced functionalities').get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="button-unarchive"]').click()
      cy.get('.confirmation-confirm').click()
      cy.get('[data-test-id="input-archived-at"]').should('not.exist')
    })

    it('should be able to test archived filter', () => {
      cy.get('.nav-sidebar').contains('Roles').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="input-search"]').type('advanced')
      // We wait 1s for the search to finish
      cy.wait(1000)
      // We check that the Suspended state doesn't exist
      cy.contains('Advanced functionalities').get('#resource-list > tbody').contains('Archived').should('not.exist')
      // We check that the text is not gray
      cy.contains('Advanced functionalities').get('.text-secondary').should('not.exist')
      cy.get('[data-test-id="filter-archived-roles"]').contains('Only').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.contains('Advanced functionalities').should('not.exist')
    })
  })
})
