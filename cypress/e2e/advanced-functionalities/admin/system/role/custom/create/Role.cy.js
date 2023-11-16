/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')

describe('Test for creating a role with limited permissions', () => {
  context('Test for creating additional role', () => {
    it('should create a role that will have limited permissions', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/roles/?query=&deleted=0&archived=0&limit=100&incTotal=true&sort=createdAt+DESC').as('roles')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/role"]').click({ force: true })
      cy.wait('@roles')
      cy.get('[data-test-id="button-new-role"]').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('Test')
        cy.get('[data-test-id="input-handle"]').type('test')
        cy.get('[data-test-id="button-submit"]').click()
      })
    })
  })
})
