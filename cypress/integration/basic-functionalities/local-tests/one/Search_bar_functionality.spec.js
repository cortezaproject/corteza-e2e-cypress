/// <reference types="cypress" />
const oneURL = Cypress.env('webappLink').oneURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for checking the search bar functionality', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: oneURL })
    }
  })

  context('Test for searching a non existing app', () => {
    it('should not be able to search for a non existing app', () => {
      // Here we close the start tour pop up (This won't be needed if we are already logged in)
      //cy.get('.modal-header > :last-child()').click()
      cy.get('[data-test-id="input-search"]').type('xw')
      cy.get('[data-test-id="heading-no-apps"]').should('exist')
    })
  })

  context('Test for searching an existing app', () => {
    it('should be able to search for the Admin Area', () => {
      cy.get('[data-test-id="input-search"]').clear().type('admin')
      cy.get('[data-test-id="Admin Area"]').click({ force: true })
      cy.url().should('exist', oneURL + '/admin')
    })

    it('should be able to search for the Low Code (Compose)', () => {
      // Here we close the start tour pop up
      cy.get('.modal-header > :last-child()').click()
      cy.get('[data-test-id="input-search"]').clear().type('low code')
      cy.get('[data-test-id="Low Code"]').click({ force: true })
      cy.url().should('exist', oneURL + '/compose')
    })
  })
})
