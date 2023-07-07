/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting an integration gateway', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for deleting an integration gateway', () => {
    it('should check whether the correct buttons and states are shown', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/apigw/route/?query=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('integration-gateway')
      cy.intercept('/api/system/apigw/route/?query=%2FtestEdited&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/apigw"]').click({ force: true })
      cy.wait('@integration-gateway')
      cy.get('[data-test-id="input-search"]').type('/testEdited')
      cy.wait('@search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="input-delete-at"]').should('not.exist')
      cy.get('[data-test-id="input-updated-at"]').should('exist')
      cy.get('[data-test-id="input-create-at"]').should('exist')
      cy.get('[data-test-id="button-submit"]').should('exist')
      cy.get('[data-test-id="button-add"]').should('exist')
      cy.get('[data-test-id="button-delete"]').should('exist')
      cy.get('[data-test-id="button-undelete"]').should('not.exist')
    })

    it('should be able to delete an integration gateway', () => {
      cy.intercept('/api/system/apigw/route/?query=%2FtestEdited&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search')
      cy.get('[data-test-id="card-route-edit"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      cy.get('[data-test-id="input-search"]').type('/testEdited')
      cy.wait('@search')
      cy.get('[data-test-id="no-matches"]').should('exist')
    })

    it('should check whether the route is present in the deleted filter', () => {
      cy.intercept('/api/system/apigw/route/?query=%2FtestEdited&deleted=2&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('filter')
      cy.get('[data-test-id="filter-deleted-routes"] input[value="2"]').click({ force: true })
      cy.wait('@filter')
      cy.get('[data-test-id="no-matches"]').should('not.exist')
    })
  })
})
