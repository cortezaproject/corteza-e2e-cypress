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
      cy.get('button').contains('Skip tour').click({ force: true })
      cy.get('[data-test-id="input-search"]', { timeout: 10000 }).type('testing application', { force: true })
      cy.get('.card').should('exist')
    })
  })
})
