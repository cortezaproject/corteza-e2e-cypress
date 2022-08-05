/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for editing a namespace', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test if create new namespace, export, permissions, clone and delete buttons are displayed when in edit mode', () => {
    it('should be displayed when into edit mode', () => {
      cy.visit(baseURL + '/namespaces')
      cy.get('[data-test-id="button-edit-namespace"]:last').click()
      cy.get('[data-test-id="button-create-namespace"]').should('exist')
      cy.get('[data-test-id="button-export-namespace"]').should('exist')
      cy.get('[data-test-id="button-permissions"]').should('exist')
      cy.get('[data-test-id="button-clone"]').should('exist')
      cy.get('[data-test-id="button-delete"]').should('exist')
    })
  })

  context('Test for editing a namespace', () => {
    it('should be able to edit the name, the handle and the description', () => {
      cy.get('[data-test-id="button-edit-namespace"]:last').click()
      cy.get('[data-test-id="input-name"]').clear().type('Edited namespace')
      cy.get('[data-test-id="input-slug"]').clear().type('edited_namespace')
      cy.get('[data-test-id="input-subtitle"]').clear().type('Edited subtitle')
      cy.get('[data-test-id="input-description"]').clear().type('Edited description')
      cy.get('[data-test-id="button-save"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success')
      cy.get('[data-test-id="button-save-and-close"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success')
    })

    it('should be edited', () => {
      cy.get('[data-test-id="button-edit-namespace"]:last').click()
      cy.get('[data-test-id="input-name"]').should('have.value', 'Edited namespace')
      cy.get('[data-test-id="input-slug"]').should('have.value', 'edited_namespace')
      cy.get('[data-test-id="input-subtitle"]').should('have.value', 'Edited subtitle')
      cy.get('[data-test-id="input-description"]').should('have.value', 'Edited description')
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('be.checked')
    })
  })

  context('Test for creating a namespace through edit mode', () => {
    it('should be able to create a new namespace', () => {
      cy.visit(baseURL + '/namespaces')
      cy.get('[data-test-id="button-edit-namespace"]:last').click()
      cy.get('[data-test-id="button-create-namespace"]').click()
      cy.url().should('be.equal', baseURL + '/admin/namespace/create')
    })
  })
})
