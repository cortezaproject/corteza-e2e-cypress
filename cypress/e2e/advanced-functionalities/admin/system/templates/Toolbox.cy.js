/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing template toolbox', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Testing template toolbox', () => {
    it('should be able to list partials', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/template/?query=&handle=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('templates')
      cy.intercept('/api/system/template/?query=test&handle=&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/template"]').click({ force: true })
      cy.wait('@templates')
      cy.get('[data-test-id="input-search"]').type('test')
      cy.wait('@search')
      cy.contains('test').get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="card-template-toolbox"]').within(() => {
        cy.get('[data-test-id="button-partials"]').click()
        cy.get('[data-test-id="general-template-header"]').should('exist')
        cy.get('[data-test-id="general-template-footer"]').should('exist')
        cy.get('[data-test-id="tablefy-record"]').should('exist')
      })
    })

    it('should be able to list snippets', () => {
      cy.get('[data-test-id="card-template-toolbox"]').within(() => {
        cy.get('[data-test-id="button-snippets"]').click()
        cy.get('[data-test-id="interpolate-value"]').should('exist')
        cy.get('[data-test-id="iterate-over-a-set"]').should('exist')
        cy.get('[data-test-id="call-a-function"]').should('exist')
      })
    })

    it('should be able to list samples', () => {
      cy.get('[data-test-id="card-template-toolbox"]').within(() => {
        cy.get('[data-test-id="button-samples"]').click()
        cy.get('[data-test-id="default-html"]').should('exist')
      })
    })
  })
})
