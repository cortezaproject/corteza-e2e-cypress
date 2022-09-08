/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for exporting users', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for exporting users', () => {
    it('should be able to export users', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Users').click()
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="button-export"]').click()
      // We click on the export button again, but in the pop up modal
      cy.get('[data-test-id="button-export"]').click({ multiple: true, force: true })
      // We check if the file is downloaded
      cy.readFile('cypress/downloads/export.zip').should('exist')
    })
  })
})
