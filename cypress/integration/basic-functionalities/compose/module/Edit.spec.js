/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for editing a module', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test for editing the module data and a record field', () => {
    it('should be able to edit the module', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]').click({ force: true })
      cy.get('[data-test-id="button-admin"]', { timeout: 10000 }).click()
      cy.get('[data-test-id="table-modules-list"] > .card-body > div > #resource-list > tbody')
        .contains("Cypress").click()
      cy.get('[data-test-id="input-module-name"]').type(' edited')
      cy.get('[data-test-id="input-module-handle"]').type('_edited')
      cy.get('[data-test-id="table-module-fields"] > tbody').find('tr').eq(0).within(() => {
        cy.get('input:first').clear({ force: true }).type('name', { force: true })
      })    
      cy.get('[data-test-id="button-save"]').click()
      cy.get('[data-test-id="button-save-and-close"]', { timeout: 10000 }).click()
    })

    it('should be edited', () => {
      cy.get('[data-test-id="table-modules-list"] > .card-body > div > #resource-list > tbody')
        .contains("edited").click()
      cy.get('[data-test-id="input-module-name"]').should('have.value', 'Cypress module edited')
      cy.get('[data-test-id="input-module-handle"]').should('have.value', 'cypress_module_edited')
      cy.get('[data-test-id="button-back-without-save"]', { timeout: 10000 }).click()
    })
  })

  context('Test if the federation, export and permissions buttons are displayed', () => {
    // Discovery and federation settings will only exist if they are enabled in the .env file
    it('should be displayed when in edit mode', () => {
      cy.get('[data-test-id="table-modules-list"] > .card-body > div > #resource-list > tbody')
        .contains("edited").click()
      cy.get('[data-test-id="button-federation-settings"]', { timeout: 10000 }).should('exist')
      cy.get('[data-test-id="button-export"]').should('exist')
      cy.get('.permissions-dropdown').should('exist')
    })
  })
})
