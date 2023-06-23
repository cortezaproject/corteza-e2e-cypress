/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for preparing db connection that will be used for different types of requests', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for adding sensitivity level and preparing db connection', () => {
    it('should add a sensitivity level', () => {
      cy.visit(adminURL)
      cy.intercept('/api/system/dal/sensitivity-levels/?deleted=0&incTotal=true').as('sensitivity_levels')
      cy.get('.nav-sidebar', { timeout: 10000 }).contains('Sensitivity Levels').click({ force: true })
      cy.wait('@sensitivity_levels')
      cy.get('[data-test-id="button-new-sens-lvl"]', { timeout: 10000 }).should('exist').click()
      cy.get('[data-test-id="input-name"]').type('level_1')
      cy.get('[data-test-id="button-submit"]').click()
    })

    it('should add the sensitivity level to the primary Corteza connection', () => {
      cy.intercept('/api/system/dal/connections/?type=corteza::system:dal-connection&deleted=0&incTotal=true').as('connections')
      cy.get('.nav-sidebar', { timeout: 10000 }).contains('Connections').click({ force: true })
      cy.wait('@connections')
      cy.get('[data-test-id="button-edit"]').click()
      cy.get('[data-test-id="select-sens-lvl"]').click().trigger('mousedown')
      cy.contains('level_1').click()
      cy.get('[data-test-id="button-submit"]').click()
    })
  })
})
