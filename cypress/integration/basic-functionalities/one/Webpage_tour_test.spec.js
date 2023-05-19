/// <reference types="cypress" />
const oneURL = Cypress.env('ONE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test webpage tour', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: oneURL })
    }
  })

  context('This is a function for testing the webpage tour', () => {
    it('should be able to go through the webpage tour', () => {
      cy.get('.modal-footer').should('exist')
      // We click on the start tour button
      cy.get('.modal-footer > :last-child()').click()
      Cypress._.times(5, () => {
        // With this function we click 5 times on the next button in order to go through the tour modals
        cy.get('[data-test-id="button-next"]', { timeout: 10000 }).should("exist").click()
      })
      cy.get('[data-test-id="button-stop-tour"]').click()
    })
  })
})
