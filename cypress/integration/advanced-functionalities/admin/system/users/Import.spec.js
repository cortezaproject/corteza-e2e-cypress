/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for importing users', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for importing users', () => {
    it('should be able to import users', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Users').click()
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="button-import"]').click().get('#dropzone').selectFile('cypress/downloads/export.zip', { action: 'drag-drop', force: true })
      // We check if the success toast appears
      cy.get('.b-toast-success')
    })
  })
})
