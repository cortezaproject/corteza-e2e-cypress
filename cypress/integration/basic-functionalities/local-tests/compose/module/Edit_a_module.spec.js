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
      cy.get('[data-test-id="button-visit-namespace"]:last').click()
      cy.get('[data-test-id="button-admin"]').click()
      cy.get('[data-test-id="table-modules-list"] > tbody').find(':first').click()
      cy.get('[data-test-id="input-module-name"]').type(' edited')
      cy.get('[data-test-id="input-module-handle"]').type('_edited')
      cy.get('[data-test-id="table-module-fields"] > tbody').find('tr').eq(0).within(() => {
        cy.get('input:first').clear().type('name')
      })    
      cy.get('[data-test-id="button-save"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success') 
      cy.get('[data-test-id="button-save-and-close"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success') 
    })

    it('should be edited', () => {
      cy.get('[data-test-id="table-modules-list"] > tbody').find(':first').click()
      cy.get('[data-test-id="input-module-name"]').should('have.value', 'Cypress module edited')
      cy.get('[data-test-id="input-module-handle"]').should('have.value', 'cypress_module_edited')
      cy.get('[data-test-id="button-back-without-save"]').click()
    })
  })

  context('Test if the federation, discovery settings, export and permissions buttons are displayed', () => {
    //Discovery and federation settings will only exist if they are enabled in the .env file
    it('should be displayed when in edit mode', () => {
      cy.get('[data-test-id="table-modules-list"] > tbody').find(':first').click()
      cy.get('[data-test-id="button-federation-settings"]').should('exist')
      cy.get('[data-test-id="button-discovery-settings"]').should('exist')
      cy.get('[data-test-id="button-export"]').should('exist')
      cy.get('.permissions-dropdown').should('exist')
    })
  })
})
