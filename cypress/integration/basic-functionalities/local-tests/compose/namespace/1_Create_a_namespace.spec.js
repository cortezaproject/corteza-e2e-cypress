/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up so you can log in
describe('Test for creating a namespace', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for creating a namespace without any data entered or a misconfigured field', () => {
    it('should not be able to create a namespace', () => {
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="button-save-and-close"].disabled').should('exist')
    })

    it('should not be able to create a namespace with missing name', () => {
      cy.get('[data-test-id="input-slug"]').type('short_name')
      cy.get('[data-test-id="button-save"].disabled').should('exist')
    })

    it('should not be able to create a namespace with missing handle', () => {
      cy.get('[data-test-id="input-slug"]').clear()
      cy.get('[data-test-id="input-name"]').type('Name')
      cy.get('[data-test-id="button-save"].disabled').should('exist')
    })

    it('should not be able to create a namespace with incorrect handle', () => {
      cy.get('[data-test-id="input-slug"]').type('h')
      cy.get('[data-test-id="button-save"].disabled').should('exist')
    })
  })
          
  context('Test if create new namespace, export, permissions, clone and delete buttons are not displayed when in create mode', () => {
    it('should not be displayed when into the create a new namespace view', () => {
      cy.visit(baseURL + '/namespaces')
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="button-create-namespace"]').should('not.exist')
      cy.get('[data-test-id="button-export-namespace"]').should('not.exist')
      cy.get('[data-test-id="button-permissions"]').should('not.exist')
      cy.get('[data-test-id="button-clone"]').should('not.exist')
      cy.get('[data-test-id="button-delete"]').should('not.exist')
    })
  })

  context('Test for checking the back button functionality', () => {
    it('should be able to press on back button and be redirected to the main page', () => {
      cy.visit(baseURL + '/namespaces')
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="button-back-without-save"]').should('exist').click()
      cy.url().should('be.equal', baseURL + '/namespaces')
    })
  })

  context('Test for creating a namespace', () => {
    it('should be able to create a namespace', () => {
      cy.visit(baseURL + '/namespaces')
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="input-name"]').type('Cypress namespace')
      cy.get('[data-test-id="input-slug"]').type('cypress_namespace')
      cy.get('[data-test-id="input-subtitle"]').type('Testing namespace')
      cy.get('[data-test-id="input-description"]').type('This is the description of the namespace')
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('be.checked') 
      cy.get('[data-test-id="button-save"]').click()
      cy.get('.b-toast-success') // We check if the success toast appears
      cy.url().should('exist', baseURL + '/namespaces/edit')

      cy.get('[data-test-id="input-name"]').should('have.value', 'Cypress namespace')
      cy.get('[data-test-id="input-slug"]').should('have.value', 'cypress_namespace')
      cy.get('[data-test-id="input-subtitle"]').should('have.value', 'Testing namespace')
      cy.get('[data-test-id="input-description"]').should('have.value', 'This is the description of the namespace')
      cy.get('[data-test-id="button-back-without-save"]').click()
      
      cy.get('[data-test-id="button-visit-namespace"]:last').click()
      cy.url().should('be.equal', baseURL + '/ns/cypress_namespace/pages')
    })
  })

  context('Test for creating a namespace with a same handle as another one', () => {
    it('should not be able to create a namespace with not unique handle', () => {
      cy.visit(baseURL + '/namespaces')
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="input-name"]').type('New cypress namespace')
      cy.get('[data-test-id="input-slug"]').type('cypress_namespace')
      cy.get('[data-test-id="input-subtitle"]').type('Testing namespace')
      cy.get('[data-test-id="input-description"]').type('This is the description of the namespace')
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('be.checked') 
      cy.get('[data-test-id="button-save"]').click()
      cy.get('.b-toast-danger').should('exist')
    })
  })
})
