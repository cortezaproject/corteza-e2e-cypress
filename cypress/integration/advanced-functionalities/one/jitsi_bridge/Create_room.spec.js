/// <reference types="cypress" />
const oneURL = Cypress.env('ONE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing room creation in Jitsi Bridge', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: oneURL })
    }
  })

  context('Test for creating a room in Jitsi Bridge', () => {
    it('should not be able to create a room without a name', () => {
      cy.visit(oneURL + '/')
      // Here we close the start tour pop up
      if (!window.sessionStorage.getItem('auth.refresh-token')) {
        cy.get('.modal-header > :last-child()').click()
      }
      cy.get('[data-test-id="Jitsi Bridge"]').click({ force: true })
      cy.get('[data-test-id="button-create-room"]').should('be.disabled')
    })

    it('should be able to create a room when name is entered', () => {
      cy.get('#roomInputField').type('Test room')
      cy.get('[data-test-id="button-create-room"]').click()
    })
  })
})
