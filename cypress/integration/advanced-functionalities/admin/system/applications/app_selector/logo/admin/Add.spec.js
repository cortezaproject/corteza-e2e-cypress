/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for adding a logo on application', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for adding a logo on application', () => {
    it('should be able to add a logo', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded/rendered
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="input-search"]').type('Testing application')
      // We wait 1s in order the search to be completed
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-application-selector"]').within(() => {
        cy.get('[data-test-id="file-logo-upload"]').selectFile('cypress/fixtures/images/yin_yang.png', { force: true })
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.get('[data-test-id="file-logo-upload"]').should('exist', 'yin_yang.png')
      cy.get('[data-test-id="button-logo-show"]').click()
      cy.get('[data-test-id="img-logo-preview"]').should('exist')
    })
  })
})
