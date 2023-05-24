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
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/roles/?query=&deleted=0&archived=2&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('filter')
      cy.intercept('/api/system/roles/?query=advanced&deleted=0&archived=2&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('search')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.contains('deleted roles').should('exist')
      cy.get('[data-test-id="filter-archived-roles"]').contains('Only').click()
      cy.wait('@filter')
      cy.get('[data-test-id="input-search"]').type('advanced')
      cy.wait('@search')
      cy.contains('Advanced functionalities').get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="button-unarchive"]').click()
      cy.get('.confirmation-confirm').click()
      cy.get('[data-test-id="input-archived-at"]').should('not.exist')
    })

    it('should be able to test archived filter', () => {
      cy.intercept('/api/system/roles/?query=advanced&deleted=0&archived=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('search')
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.contains('deleted roles').should('exist')
      cy.get('[data-test-id="input-search"]').type('advanced')
      cy.wait('@search')
      // We check that the Suspended state doesn't exist
      cy.contains('Advanced functionalities').get('#resource-list > tbody').contains('Archived').should('not.exist')
      // We check that the text is not gray
      cy.contains('Advanced functionalities').get('.text-secondary').should('not.exist')
      cy.get('[data-test-id="filter-archived-roles"]').contains('Only').click()
      cy.get('[data-test-id="no-matches"]', { timeout: 10000 }).should('exist')
      cy.contains('Advanced functionalities').should('not.exist')
    })
  })
})
