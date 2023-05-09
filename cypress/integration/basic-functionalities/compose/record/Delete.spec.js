/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting a record', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test for deleting a record through the all records button', () => {
    it('should be able to delete the record through the record viewer', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]').should('exist').click({ force: true })
      cy.contains('Record List').should('exist')
      cy.get('[data-test-id="button-admin"]', { timeout: 10000 }).should('exist').click()
      cy.get('[data-test-id="button-all-records"]').click()
      cy.get('table > tbody', { timeout: 10000 }).find('tr:first').click()
      cy.contains("View").should("exist")
      cy.get('[data-test-id="button-delete"]', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.get('.alert').should('exist')
    })

    it('should be able to delete the record by clicking on the edit button in the all records view', () => {
      cy.intercept("/api/system/dal/connections/").as("load")
      cy.get('.nav-sidebar').contains('Modules').click()
      cy.wait("@load")
      cy.get('[data-test-id="button-back-without-save"]', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-all-records"]').click()
      cy.get('table > tbody').find('tr:first').within(() => {
        cy.get('td:last').click().find('a:eq(0)').click()
      })
      cy.contains("Edit").should("exist")
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.get('.alert').should('exist')
    })
  })

  context('Test for deleting a record through the module all records button', () => {
    it('should be able to delete a record by clicking on it ', () => {
      cy.get('.nav-sidebar').contains('Modules').click()
      cy.get('.header-navigation').contains('All records').click()
      cy.get('table > tbody').find('tr:first').click()
      cy.contains("View").should("exist")
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.get('.alert').should('exist')
    })

    it('should be able to delete a record by clicking on edit button ', () => {
      cy.get('.nav-sidebar').contains('Modules').click()
      cy.get('.header-navigation').contains('All records').click()
      cy.get('table > tbody').find('tr:first').within(() => {
        cy.get('td:last').click().find('a:eq(0)').click()
      })
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.get('.alert').should('exist')
    })
  })

  context('Test for deleting a record on a public page', () => {
    it('should be able to delete a record by clicking on it', () => {
      cy.get('[data-test-id="button-public"]').click()
      cy.get('table > tbody').find('tr:first').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.get('.alert').should('exist')
    })

    it('should be able to delete a record by clicking on edit button ', () => {
      cy.get('.nav-sidebar').contains('Cypress page').click()
      cy.get('table > tbody').find('tr:first').within(() => {
        cy.get('td:last').click().find('a:eq(0)').click()
      })
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.get('.alert').should('exist')
    })
  })

  context('Test for deleting a record by selecting', () => {
    it('should be able to delete a record by check-marking it', () => {
      //cy.intercept("/api/system/expressions/evaluate").as("load")
      cy.get('.nav-sidebar').contains('Cypress page').click()
      //cy.wait("@load")
      cy.get('table > tbody').find('tr:first').should("exist")
      cy.get('[type="checkbox"]:last', { timeout: 10000 }).check({ force: true })
      cy.get('div > div > [data-test-id="button-delete"]', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success') 

      cy.get('table > tbody').find('tr:first').should("exist")
      cy.get('[type="checkbox"]:first', { timeout: 10000 }).check({ force: true })
      cy.get('div > div > [data-test-id="button-delete"]', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success') 
    })
  })
})  
