/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting a template', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for deleting a template', () => {
    it('should be able to delete a template', () => {
      cy.intercept('/api/system/template/?query=&handle=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('templates')
      cy.intercept('/api/system/template/?query=test&handle=&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search')
      cy.get('.nav-sidebar').find('a[href="/system/template"]').click({ force: true })
      cy.wait('@templates')
      cy.get('[data-test-id="input-search"]').type('test')
      cy.wait('@search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      cy.get('[data-test-id="input-search"]').type('test')
      cy.get('[data-test-id="no-matches"]').should('exist')
    })
  })
})
