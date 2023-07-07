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
    it('should be able to filter only deleted roles', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/roles/?query=&deleted=2&archived=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('filter')
      cy.intercept('/api/system/roles/?query=advanced&deleted=2&archived=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('deleted')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/role"]').click({ force: true })
      cy.get('[data-test-id="filter-deleted-roles"]').should('exist')
      cy.get('[data-test-id="filter-deleted-roles"] input[value="2"]').click({ force: true })
      cy.wait('@filter')
      cy.get('[data-test-id="input-search"]').type('advanced')
      cy.wait('@deleted')
      // We check if the text is gray
      cy.contains('Advanced functionalities').get('.text-secondary').should('exist')
      cy.contains('Advanced functionalities').get('#resource-list > tbody > tr:last').click()
      cy.get('[data-test-id="input-deleted-at"]').should('exist')
    })
  })
})
