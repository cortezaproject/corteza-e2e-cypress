/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a namespace', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test for creating a namespace without any data entered or a misconfigured field', () => {
    it('should not be able to create a namespace', () => {
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="button-save-and-close"].disabled').should('exist')
    })

    it('should not be able to create a namespace with missing name', () => {
      cy.get('[data-test-id="input-slug"]').type('short_name')
      cy.get('[data-test-id="button-save"].disabled').should('exist')
    })

    it('should not be able to create a namespace with incorrect handle', () => {
      cy.get('[data-test-id="input-slug"]').type('h')
      cy.get('[data-test-id="button-save"].disabled').should('exist')
    })
  })

  context('Test if export, permissions, clone and delete buttons are not displayed when in create mode', () => {
    it('should not be displayed when into the create a new namespace view', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
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
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="button-back-without-save"]', { timeout: 10000 }).should('exist').click()
      cy.url().should('contain', composeURL + '/namespaces/manage')
    })
  })

  context('Test for creating a namespace', () => {
    it('should be able to create a namespace', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="input-name"]').type('Cypress namespace')
      cy.get('[data-test-id="input-slug"]').type('cypress_namespace')
      cy.get('[data-test-id="input-subtitle"]').type('Testing namespace')
      cy.get('[data-test-id="input-description"]').type('This is the description of the namespace')
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('be.checked')
      cy.get('[data-test-id="button-save"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success')
    })

    it('should exist', () => {
      cy.url().should('exist', composeURL + '/namespaces/edit')
      cy.get('[data-test-id="input-name"]').should('have.value', 'Cypress namespace')
      cy.get('[data-test-id="input-slug"]').should('have.value', 'cypress_namespace')
      cy.get('[data-test-id="input-subtitle"]').should('have.value', 'Testing namespace')
      cy.get('[data-test-id="input-description"]').should('have.value', 'This is the description of the namespace')
      cy.get('[data-test-id="button-back-without-save"]', { timeout: 10000 }).click()
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.get('tbody').contains('cypress_namespace').should('exist')
    })

    it('should be able to create a namespace with missing handle', () => {
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="input-name"]').type('Name')
      cy.get('[data-test-id="button-save"]').click()
    })

    it('should exist', () => {
      cy.url().should('exist', composeURL + '/namespaces/edit')
      cy.get('[data-test-id="input-name"]').should('have.value', 'Name')
      cy.get('[data-test-id="input-slug"]').should('have.value', '')
      cy.get('[data-test-id="button-back-without-save"]', { timeout: 10000 }).click()
      cy.get('[data-test-id="input-search"]').type('Name')
      cy.get('tbody').contains('Name').should('exist')
    })
  })

  context('Test for creating a namespace with a same handle as another one', () => {
    it('should not be able to create a namespace with not unique handle', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="input-name"]').type('New cypress namespace')
      cy.get('[data-test-id="input-slug"]').type('cypress_namespace')
      cy.get('[data-test-id="input-subtitle"]').type('Testing namespace')
      cy.get('[data-test-id="input-description"]').type('This is the description of the namespace')
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('be.checked')
      cy.get('[data-test-id="button-save"]').click()
      // We check if the danger toast appears
      cy.get('.b-toast-danger').should('exist')
    })
  })
})
