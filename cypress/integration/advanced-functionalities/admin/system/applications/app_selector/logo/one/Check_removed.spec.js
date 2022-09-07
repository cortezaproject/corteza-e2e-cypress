/// <reference types="cypress" />
const oneURL = Cypress.env('ONE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing whether the logo is removed in ONE', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: oneURL })
    }
  })

  context('Testing whether the logo is removed in ONE', () => {
    it('should be displayed', () => {
      cy.visit(oneURL)
      // Here we close the start tour pop up
      if (!window.sessionStorage.getItem('auth.refresh-token')) {
        cy.get('.modal-header > :last-child()').click()
      }
      cy.get('[data-test-id="input-search"]').type('Testing application', { force: true })
      cy.get('.card > div > img').should('not.contain', 'yin_yang.png')
    })
  })
})
