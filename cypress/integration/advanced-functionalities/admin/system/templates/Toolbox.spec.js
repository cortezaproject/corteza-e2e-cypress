/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing template toolbox', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Testing template toolbox', () => {
    it('should be able to list partials', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Templates').click()
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="input-search"]').type('test')
      // We wait 1s for the search to finish
      cy.wait(1000)
      cy.contains('test').get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-template-toolbox"]').within(() => {
        cy.get('[data-test-id="button-Partials"]').click()
        cy.contains('General template header').should('exist')
        cy.contains('General template footer').should('exist')
        cy.contains('Tablefy Record').should('exist')
      })
    })

    it('should be able to list snippets', () => {
      cy.get('[data-test-id="card-template-toolbox"]').within(() => {
        cy.get('[data-test-id="button-Snippets"]').click()
        cy.contains('Interpolate value').should('exist')
        cy.contains('Iterate over a set').should('exist')
        cy.contains('Call a function').should('exist')
      })
    })

    it('should be able to list samples', () => {
      cy.get('[data-test-id="card-template-toolbox"]').within(() => {
        cy.get('[data-test-id="button-Samples"]').click()
        cy.contains('Default HTML').should('exist')
      })
    })
  })
})
