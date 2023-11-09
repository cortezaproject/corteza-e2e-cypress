/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for un-deleting a template', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for un-deleting a template', () => {
    it('should be able to un-delete a template', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/template/?query=&handle=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('templates')
      cy.intercept('/api/system/template/?query=test&handle=&deleted=2&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search')
      cy.intercept('/api/system/template/?query=&handle=&deleted=2&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('filter')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/template"]').click({ force: true })
      cy.wait('@templates')
      cy.get('[data-test-id="filter-deleted-template"] input[value="2"]').click({ force: true })
      cy.wait('@filter')
      cy.get('[data-test-id="input-search"]').type('test')
      cy.wait('@search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-undelete"]').click()
      cy.get('.confirmation-confirm').click()
      cy.get('[data-test-id="input-deleted-at"]').should('not.exist')
    })

    it('should be able to test deleted filter', () => {
      cy.intercept('/api/system/template/?query=&handle=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('templates')
      cy.intercept('/api/system/template/?query=test&handle=&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search')
      cy.intercept('/api/system/template/?query=test&handle=&deleted=2&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('filter')
      cy.get('.nav-sidebar').find('a[href="/system/template"]').click({ force: true })
      cy.wait('@templates')
      cy.get('[data-test-id="input-search"]').type('test')
      cy.wait('@search')
      // We check that the Deleted state doesn't exist
      cy.contains('test').get('#resource-list > tbody').contains('Deleted').should('not.exist')
      // We check that the text is not gray
      cy.contains('test').get('.text-secondary').should('not.exist')
      cy.get('[data-test-id="filter-deleted-template"] input[value="2"]').click({ force: true })
      cy.wait('@filter')
      cy.get('[data-test-id="no-matches"]').should('exist')
    })
  })
})
