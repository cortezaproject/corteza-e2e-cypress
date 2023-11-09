/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for editing a record', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })
  
  context('Test for cloning a record', () => {
    it('should be able to clone a record ', () => {
      cy.get('.nav-sidebar').contains('Modules').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="button-back-without-save"]', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-all-records"]').click()
      cy.get('table > tbody').find('tr:first').within(() => {
        cy.get('td').find('a:eq(1)').click()
      })

      cy.get('[data-test-id="button-clone"]').click()
      cy.get('input:nth-child(1)').eq(1).clear().type('31')
      cy.get('input:nth-child(1)').eq(2).clear().type('Bob')
      cy.get('input:nth-child(1)').eq(3).clear().type('Wiser')
      cy.get('[data-test-id="button-save"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.card-body', { timeout: 10000 }).contains('31').should('exist')
      cy.get('.card-body').contains('Bob').should('exist')
      cy.get('.card-body').contains('Wiser').should('exist')
      cy.url().should('contain', '/record/')
    })
  })
})