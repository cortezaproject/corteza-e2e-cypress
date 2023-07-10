/// <reference types="cypress" />
const oneURL = Cypress.env('ONE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing whether the app name is edited', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: oneURL })
    }
  })

  context('Testing whether the app name is edited', () => {
    it('should be edited', () => {
      cy.visit(oneURL + '/')
      // Here we close the start tour pop up
      if (!window.sessionStorage.getItem('auth.refresh-token')) {
        cy.get('.modal-header > :last-child()').click()
      }
      cy.get('[data-test-id="input-search"]', { timeout: 10000 }).type('testing application', { force: true })
      cy.get('.overflow-auto').contains('Edited testing application')
    })
  })
})
