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
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/users/?query=&deleted=0&suspended=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('users')
      cy.intercept('/api/system/users/?query=&deleted=2&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('filter')
      cy.intercept('/api/system/users/?query=Permissions&deleted=2&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/user"]').click({ force: true })
      cy.wait('@users')
      cy.get('[data-test-id="filter-deleted-users"] input[value="2"]').click({ force: true })
      cy.wait('@filter')
      cy.get('[data-test-id="input-search"]').type('Permissions')
      cy.wait('@search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-undelete"]').click()
      cy.get('.confirmation-confirm').click()
      cy.get('[data-test-id="input-deleted-at"]').should('not.exist')
    })
    
    it('should be able to test deleted filter', () => {
      cy.intercept('/api/system/users/?query=&deleted=0&suspended=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('users')
      cy.intercept('api/system/users/?query=Permissions&deleted=2&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('filter')
      cy.intercept('/api/system/users/?query=Permissions&deleted=0&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search')
      cy.get('.nav-sidebar').find('a[href="/system/user"]').click({ force: true })
      cy.wait('@users')
      cy.get('[data-test-id="input-search"]').type('Permissions')
      cy.wait('@search')
      // We check that the Deleted state doesn't exist
      cy.contains('Permissions account').get('#resource-list > tbody').contains('Deleted').should('not.exist')
      // We check that the text is not gray
      cy.contains('Permissions account').get('.text-secondary').should('not.exist')
      cy.get('[data-test-id="filter-deleted-users"] input[value="2"]').click({ force: true })
      cy.wait('@filter')
      cy.contains('Permissions account').should('not.exist')
    })
  })
})
