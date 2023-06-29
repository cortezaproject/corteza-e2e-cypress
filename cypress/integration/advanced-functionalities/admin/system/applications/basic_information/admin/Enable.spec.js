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
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded/rendered
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Applications').click()
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
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="input-search"]').type('Testing application')
      // We wait 1s in order the search to be completed
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-application-selector"]').within(() => {
        cy.get('[data-test-id="checkbox-listed"]').should('be.checked')
      })
    })
  })
})
