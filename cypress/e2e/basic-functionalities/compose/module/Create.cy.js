/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a module', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  // Before running this test make sure that federation and discovery settings are enabled, otherwise the test will fail
  context('Test for creating a module without any data or misconfigured field', () => {
    it('should not be able to create a module without any data entered', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-admin"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-create"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-save-and-close"].disabled', { timeout: 10000 }).should('exist')
    })

    it('should not be able to create a module with missing name', () => {
      cy.get('[data-test-id="input-module-handle"]').type('handle')
      cy.get('[data-test-id="button-save"].disabled').should('exist')
    })

    it('should not be able to create a module with misconfigured handle', () => {
      cy.get('[data-test-id="input-module-name"]').type('Cypress module')
      cy.get('[data-test-id="input-module-handle"]').clear().type('h')
      cy.get('[data-test-id="button-save"].disabled').should('exist')
    })
  })

  context('Test for checking if buttons in the toolbar or component should/should not be displayed', () => {
    it('should not display federation, discovery settings, export and permissions buttons when in create module mode', () => {
      cy.get('[data-test-id="button-federation-settings"]').should('not.exist')
      cy.get('[data-test-id="button-discovery-settings"]').should('not.exist')
      cy.get('[data-test-id="button-export"]').should('not.exist')
      cy.get('.permissions-dropdown').should('not.exist')
      cy.get('[data-test-id="button-save-and-close"].disabled').should('exist')
      cy.get('[data-test-id="button-save"].disabled').should('exist')
    })
  })

  context('Test for creating a module', () => {
    it('should be able to create a module', () => {
      cy.get('a[title="Modules"]', { timeout: 10000 }).should('exist').click()
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="input-module-name"]').type('Cypress module')
      cy.get('[data-test-id="input-module-handle"]').type('cypress_module')
      cy.get('[data-test-id="table-module-fields"] > tbody').find('tr').eq(0).within(() => {
        cy.get('input:first').clear().type('name')
        cy.get('input:eq(1)').type('Name')
      })
      cy.get('[data-test-id="button-field-add"]').click()
      cy.get('[data-test-id="table-module-fields"] > tbody').find('tr').eq(1).within(() => {
        cy.get('input:first').type('surname')
        cy.get('input:eq(1)').type('Surname')
      })
      cy.get('[data-test-id="button-field-add"]').click()
      cy.get('[data-test-id="table-module-fields"] > tbody').find('tr').eq(2).within(() => {
        cy.get('input:first').type('age')
        cy.get('input:eq(1)').type('Age')
        cy.get('[data-test-id="select"]').click()
        cy.get('input[type="search"]').type('number{enter}')
      })
      cy.get('[data-test-id="button-save"]', { timeout: 10000 }).click()
    })
  })
})
