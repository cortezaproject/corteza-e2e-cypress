/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating an integration gateway', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for creating an integration gateway', () => {
    it('should check whether the correct buttons and states are present', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Integration Gateway').click()
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="button-add"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="button-delete"]').should('not.exist')
      cy.get('[data-test-id="button-undelete"]').should('not.exist')
      cy.get('[data-test-id="button-submit"].disabled').should('exist')
      cy.get('[data-test-id="button-add"]').should('not.exist')
      cy.get('[data-test-id="input-created-at"]').should('not.exist')
      cy.get('[data-test-id="input-updated-at"]').should('not.exist')
      cy.get('[data-test-id="input-deleted-at"]').should('not.exist')
    })

    it('should check whether all of the methods are present', () => {
      cy.get('[data-test-id="select-method"]').select('POST')
      cy.get('[data-test-id="select-method"]').should('have.value', 'POST')
      cy.get('[data-test-id="select-method"]').select('PUT')
      cy.get('[data-test-id="select-method"]').should('have.value', 'PUT')
      cy.get('[data-test-id="select-method"]').select('DELETE')
      cy.get('[data-test-id="select-method"]').should('have.value', 'DELETE')
      cy.get('[data-test-id="select-method"]').select('GET')
      cy.get('[data-test-id="select-method"]').should('have.value', 'GET')
    })

    it('should not be able to create an integration gateway with a misconfigured field', () => {
      cy.get('[data-test-id="input-endpoint"]').type('name')
      // We see that the submit button is disabled
      cy.get('[data-test-id="button-submit"].disabled').should('exist')
    })

    it('should check whether the input warning text is changed when criteria is met', () => {
      cy.get('[data-test-id="input-endpoint"]').clear().type('test')
      // We checked if the field is red/invalid
      cy.get('[data-test-id="input-endpoint"].is-invalid').should('exist')
      // When the input is not correct we see the text displayed below
      cy.contains('Endpoint must begin with a slash "/"').should('exist')

      cy.get('[data-test-id="input-endpoint"]').clear().type('/test')
      // We checked if the field is red/invalid
      cy.get('[data-test-id="input-endpoint"].is-invalid').should('not.exist')
      // When the input is not correct we see the text displayed below
      cy.contains('Endpoint must begin with a slash "/"').should('not.exist')
    })

    it('should be able to create an integration gateway', () => {
      cy.get('[data-test-id="input-endpoint"]').clear().type('/test')
      cy.get('[data-test-id="input-endpoint"].is-invalid').should('not.exist')
      cy.get('[data-test-id="checkbox-enabled"]').check({ force: true })
      cy.get('[data-test-id="button-submit"]').click()
      cy.get('[data-test-id="input-create-at"]').should('exist')
    })

    it('should check whether the data is persisted', () => {
      cy.get('[data-test-id="input-endpoint"]').should('have.value', '/test')
      cy.get('[data-test-id="input-route-id"]').should('exist')
    })
  })
})
