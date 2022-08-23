/// <reference types="cypress" />
const composeURL = Cypress.env('webappLink').composeURL
const oneURL = Cypress.env('webappLink').oneURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Testing second layer of namespace', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: composeURL })
    }
  })
  // We need to create a namespace so we can have data to work with
  context('Test for creating a namespace', () => {
    it('should be able to create a namespace', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="input-name"]').type('Cypress namespace')
      cy.get('[data-test-id="input-slug"]').type('cypress_namespace')
      cy.get('[data-test-id="input-subtitle"]').type('Testing namespace')
      cy.get('[data-test-id="input-description"]').type('This is the description of the namespace')
      cy.get('[data-test-id="button-save-and-close"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success')
    })
  })

  context('Test for checking the enable namespace checkbox', () => {
    it('should be able to uncheck the checkbox and NS to be disabled', () => {
      cy.get('[data-test-id="button-edit-namespace"]:last').click()
      cy.get('[data-test-id="checkbox-enable-namespace"]').uncheck({ force: true })
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('not.be.checked')
      cy.get('[data-test-id="button-save-and-close"]').click()
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      cy.get('[data-test-id="button-visit-namespace"]').should('not.exist')
    })

    it('should be able to check the checkbox and NS to be enabled', () => {
      cy.get('[data-test-id="button-edit-namespace"]').click()
      cy.get('[data-test-id="checkbox-enable-namespace"]').check({ force: true })
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('be.checked')
      cy.get('[data-test-id="button-save-and-close"]').click()
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      cy.get('[data-test-id="button-visit-namespace"]').should('exist')
    })
  })

  context('Test for checking the enable on application list checkbox', () => {
    it('should be able to check the checkbox and NS to be enabled on application list', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      cy.get('[data-test-id="button-edit-namespace"]').click()
      cy.get('[data-test-id="checkbox-toggle-application"]').check({ force: true })
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('be.checked')
      cy.get('[data-test-id="button-save-and-close"]').click()

      cy.visit(oneURL + '/')
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
    })
  })
})
