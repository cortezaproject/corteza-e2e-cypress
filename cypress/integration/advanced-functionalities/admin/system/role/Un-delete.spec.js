/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for un-deleting a role', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for un-deleting a role', () => {
    it('should be able to un-delete a role', () => {
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
      cy.get('#resource-list td:nth-child(2)').click()
      cy.get('[data-test-id="button-undelete"]').click()
      cy.get('.confirmation-confirm').click()
      cy.get('[data-test-id="input-deleted-at"]').should('not.exist')
    })

    it('should be able to test deleted filter', () => {
      cy.intercept('/api/system/roles/?query=advanced&deleted=0&archived=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('role')
      cy.get('.nav-sidebar').find('a[href="/system/role"]').click({ force: true })
      cy.get('[data-test-id="filter-deleted-roles"]').should('exist')
      cy.get('[data-test-id="input-search"]').type('advanced')
      cy.wait('@role')
      cy.get('[data-test-id="filter-deleted-roles"] input[value="2"]').click({ force: true })
      cy.get('[data-test-id="no-matches"]').should('exist')
      cy.contains('Advanced functionalities').should('not.exist')
    })
  })
})
