/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for editing the name of the application', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for editing the name of the application', () => {
    it('should not be able to delete the name in app selector', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('api/system/application/?query=Testing+application&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search')
      cy.intercept('/api/system/application/?query=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('applications')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/application"]').click({ force: true })
      cy.wait('@applications')
      cy.get('[data-test-id="input-search"]').type('Testing application')
      cy.wait('@search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="checkbox-enabled"]').check({ force: true })
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('[data-test-id="card-application-selector"]').within(() => {
        cy.get('[data-test-id="input-name"]').clear()
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('[data-test-id="input-name"]').should('have.value', 'Testing application')
    })

    it('should be able to edit the name in app selector', () => {
      cy.get('[data-test-id="card-application-selector"]').within(() => {
        cy.get('[data-test-id="input-name"]', { timeout: 10000 }).clear().type('Edited testing application')
        cy.get('[data-test-id="button-submit"]').click({ force: true }).get('svg .fa-check').should('not.exist')
        cy.get('[data-test-id="input-name"]').should('have.value', 'Edited testing application')
      })
    })
  })
})
