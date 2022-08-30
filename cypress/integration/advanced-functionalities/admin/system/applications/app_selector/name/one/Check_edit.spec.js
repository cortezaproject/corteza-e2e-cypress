/// <reference types="cypress" />
const oneURL = Cypress.env('webappLink').oneURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Testing whether the app name is edited', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: oneURL })
    }
  })

  context('Testing whether the app name is edited', () => {
    it('should be edited', () => {
      cy.visit(oneURL)
      // Here we close the start tour pop up
      if (!window.sessionStorage.getItem('auth.refresh-token')) {
        cy.get('.modal-header > :last-child()').click()
      }
      cy.get('[data-test-id="input-search"]').type('Testing application', { force: true })
      cy.get('.overflow-auto').contains('Edited testing application')
    })
  })
})
