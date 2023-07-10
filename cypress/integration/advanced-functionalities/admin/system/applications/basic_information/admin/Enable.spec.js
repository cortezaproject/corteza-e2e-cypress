/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for enabling admin application', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for enabling an application', () => {
    it('should be able to create an application', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/application/?query=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('applications')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.wait('@applications')
      cy.get('[data-test-id="button-new-application"]').click()
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('Testing application')
        cy.get('[data-test-id="checkbox-enabled"]').check({ force: true })
        cy.get('[data-test-id="button-submit"]').click()
      })
    })

    it('should be able to enable the application and be shown in webapp ONE', () => {
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="checkbox-enabled"]').should('be.checked')
      })
      cy.get('[data-test-id="card-application-selector"]').within(() => {
        // In order the app to be shown, the listed checkbox should be also enabled
        cy.get('[data-test-id="checkbox-listed"]').check({ force: true })
        cy.get('[data-test-id="input-url"]').type('https://google.com')
        cy.get('[data-test-id="button-submit"]').click()
      })
    })

    it('should check whether the listed checkbox is enabled', () => {
      cy.intercept('/api/system/application/?query=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('applications')
      cy.intercept('api/system/application/?query=Testing+application&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('search')
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.wait('@applications')
      cy.get('[data-test-id="input-search"]').type('Testing application')
      cy.wait('@search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="card-application-selector"]').within(() => {
        cy.get('[data-test-id="checkbox-listed"]').should('be.checked')
      })
    })
  })
})
