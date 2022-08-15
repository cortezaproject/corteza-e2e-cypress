/// <reference types="cypress" />
const composeURL = Cypress.env('webappLink').composeURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for deleting a record', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: composeURL })
    }
  })

  context('Test for deleting a record through the all records button', () => {
    it('should be able to delete the record through the record viewer', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-visit-namespace"]:last').click()
      cy.get('[data-test-id="button-admin"]').click()
      cy.get('[data-test-id="button-all-records"]').click()
      cy.get('table > tbody').find('tr:first').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.get('.alert').should('exist')
    })

    it('should be able to delete the record by clicking on the edit button in the all records view', () => {
      cy.get('.nav-sidebar').contains('Modules').click()
      cy.get('[data-test-id="button-back-without-save"]').click()
      cy.get('[data-test-id="button-all-records"]').click()
      cy.get('table > tbody').find('tr:first').within(() => {
        cy.get('td').find('a').click()
      })
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
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.get('.alert').should('exist')
    })

    it('should be able to delete a record by clicking on edit button ', () => {
      cy.get('.nav-sidebar').contains('Modules').click()
      cy.get('.header-navigation').contains('All records').click()
      cy.get('table > tbody').find('tr:first').within(() => {
        cy.get('td').find('a').click()
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

    it('should be able to edit a record by clicking on edit button ', () => {
      cy.get('.nav-sidebar').contains('Cypress page').click()
      cy.get('table > tbody').find('tr:first').within(() => {
        cy.get('td').find('a').click()
      })
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.get('.alert').should('exist')
    })
  })

  context('Test for deleting a record by selecting', () => {
    it('should be able to delete a record by check-marking it', () => {
      cy.get('.nav-sidebar').contains('Cypress page').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[type="checkbox"]:last').check({ force: true })
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success') 
    })
  })
})
