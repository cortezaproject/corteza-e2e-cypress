/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing deleted filter', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Testing deleted filter', () => {
    it('should be able to filter only deleted users', () => {
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
      // We check if the text is gray
      cy.contains('Permissions account').get('.text-secondary').should('exist')
      cy.contains('Permissions account').get('#resource-list > tbody > tr:last').click()
      cy.get('[data-test-id="input-deleted-at"]').should('exist')
    })
  })
})
