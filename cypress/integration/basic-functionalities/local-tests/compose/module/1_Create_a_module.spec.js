/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up and create a namespace so you can create a module
// ORIGINAL
describe('Test for creating a module', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for creating a module without any data entered', () => {
    it('should not be able to create a module', () => {
      cy.get('[data-test-id="button-visit-namespace"]:last').click()
      cy.get('[data-test-id="button-admin"]').click()
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="button-save-and-close"].disabled').should('exist')
    })
  })

  context('Test for creating a module with missing name', () => {
    it('should not be able to create a module with missing name', () => {
      cy.get('[data-test-id="input-module-handle"]').type('handle')
      cy.get('[data-test-id="button-save"].disabled').should('exist')
    })
  })

  context('Test for creating a module with misconfigured handle', () => {
    it('should not be able to create a module with misconfigured handle', () => {
      cy.get('[data-test-id="input-module-name"]').type('Cypress module')
      cy.get('[data-test-id="input-module-handle"]').clear().type('h')
      cy.get('[data-test-id="button-save"].disabled').should('exist')
    })
  })

  context('Test for checking the back button functionality', () => {
    it('should be able to press the back button and be redirected to the list of modules page', () => {
      cy.get('[data-test-id="button-back-without-save"]').should('exist').click()
      cy.url().should('be.equal', baseURL + '/ns/cypress_namespace/admin/modules')
    })
  })
  
  context('Test if the federation, discovery settings, export and permissions buttons are displayed', () => {
    it('should not be displayed when in create a module mode', () => {
      cy.get('[data-test-id="button-create"]').click()
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
          cy.get('select').select('Number input')
        })
      cy.get('[data-test-id="button-save-and-close"]').click()
      cy.get('.b-toast-success') // We check if the success toast appears
      cy.contains('Cypress module').should('exist')
    })
  })

  context('Test for creating a module with same name as existing one', () => {
    it('should not be able to create a module with identical name', () => {
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="input-module-name"]').type('Cypress module')
      cy.get('[data-test-id="input-module-handle"]').type('cypress_module')
      cy.get('[data-test-id="table-module-fields"] > tbody').find('tr').eq(0).within(() => {
        cy.get('input:first').type('name')
        cy.get('input:eq(1)').type('Name')
      })
      cy.get('[data-test-id="button-save-and-close"]').click()
      cy.get('.b-toast-danger') // We check if the error toast appears
      cy.get('[data-test-id="button-back-without-save"]').click()
    })
  })
})

// PROPOSITION
describe('Test for creating a module', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for creating a module without any data or misconfigured field', () => {
    it('should not be able to create a module without nay data entered', () => {
      cy.get('[data-test-id="button-visit-namespace"]:last').click()
      cy.get('[data-test-id="button-admin"]').click()
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="button-save-and-close"].disabled').should('exist')
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
    it('should be able to press the back button and be redirected to the list of modules page', () => {
      cy.get('[data-test-id="button-back-without-save"]').should('exist').click()
      cy.url().should('be.equal', baseURL + '/ns/cypress_namespace/admin/modules')
    })
  
    it('should not display federation, discovery settings, export and permissions buttons when in create module mode', () => {
      cy.get('[data-test-id="button-create"]').click()
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
          cy.get('select').select('Number input')
        })
      cy.get('[data-test-id="button-save-and-close"]').click()
      cy.get('.b-toast-success') // We check if the success toast appears
      cy.contains('Cypress module').should('exist')
    })
  })

  context('Test for creating a module with same name as existing one', () => {
    it('should not be able to create a module with identical name', () => {
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="input-module-name"]').type('Cypress module')
      cy.get('[data-test-id="input-module-handle"]').type('cypress_module')
      cy.get('[data-test-id="table-module-fields"] > tbody').find('tr').eq(0).within(() => {
        cy.get('input:first').type('name')
        cy.get('input:eq(1)').type('Name')
      })
      cy.get('[data-test-id="button-save-and-close"]').click()
      cy.get('.b-toast-danger') // We check if the error toast appears
      cy.get('[data-test-id="button-back-without-save"]').click()
    })
  })
})
