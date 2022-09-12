/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing archived filter', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Testing archived filter', () => {
    it('should be able to filter only archived roles', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Roles').click()
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="filter-archived-roles"]').contains('Only').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="input-search"]').type('advanced')
      // We wait 1s for the search to finish
      cy.wait(1000)
      // We check if the state is Suspended
      cy.contains('Advanced functionalities').get('#resource-list > tbody').contains('Archived').should('exist')
      // We check if the text is gray
      cy.contains('Advanced functionalities').get('.text-secondary').should('exist')
      cy.contains('Advanced functionalities').get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="input-archived-at"]').should('exist')
    })
  })
})
