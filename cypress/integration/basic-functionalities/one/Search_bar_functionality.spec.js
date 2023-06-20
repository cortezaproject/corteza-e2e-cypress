/// <reference types="cypress" />
const oneURL = Cypress.env('ONE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for checking the search bar functionality', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: oneURL })
    }
  })

  context('Test for searching a non existing app', () => {
    it('should not be able to search for a non existing app', () => {
      // Here we close the start tour pop up
      if (!window.sessionStorage.getItem('auth.refresh-token')) {
        cy.wait(1000)
        cy.get('.modal-header > :last-child()').click({ force: true })
      }
      cy.get('[data-test-id="input-search"]', { timeout: 10000 }).type('xw')
      cy.get('[data-test-id="heading-no-apps"]', { timeout: 10000 }).should('exist')
    })
  })

  context('Test for searching an existing app', () => {
    it('should be able to search for the Admin Area', () => {
      if (!window.sessionStorage.getItem('auth.refresh-token')) {
        cy.wait(1000)
        cy.get('.modal-header > :last-child()').click({ force: true })
      }
      cy.wait(1000)
      cy.get('[data-test-id="input-search"]').clear().type('admin')
      cy.get('[data-test-id="Admin Area"]', { timeout: 10000 }).click({ force: true })
      cy.url().should('exist', oneURL + '/admin')
    })
  })
})
