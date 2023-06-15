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
  
  context('Test for cloning a namespace', () => {
    it('should be able to clone a namespace', () => {
      //  test!
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="input-search"]').type('edited')
      // We wait 1s in order the page to be loaded
      cy.wait(1000)
      cy.get('tbody').click()
      cy.get('[data-test-id="button-clone"]').click()
      cy.url().should('exist', '/clone/')
    })
  })
})