/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for editing a template', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for checking that new, delete and submit buttons are displayed when in edit mode', () => {
    it('should be displayed when editing a template', () => {
      cy.get('.nav-sidebar', { timeout: 10000 }).contains('Templates').click()
      cy.get('[data-test-id="input-search"]').type('automated_template')
      // We should wait in order the search to be completed
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last > td:last > a', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-new-template"]').should('exist')
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').should('exist')
        cy.get('[data-test-id="button-submit"]').should('exist')
      })
    })
  })

  context('Test for editing a template', () => {
    it('should be able to edit the template', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').type(' edited')
        cy.get('[data-test-id="input-handle"]').type('_edited')
        cy.get('[data-test-id="textarea-description"]').type(' edited')
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })
  })

  context('Test for checking if the template got edited', () => {
    it('should be edited', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').should('have.value', 'automated template edited')
        cy.get('[data-test-id="input-handle"]').should('have.value', 'automated_template_edited')
        cy.get('[data-test-id="textarea-description"]').should('have.value', 'automated description edited')
        cy.get('[data-test-id="input-updated-at"]').should('exist')
      })
      cy.get('.nav-sidebar').contains('Templates').click()
      cy.get('[data-test-id="input-search"]').type('automated_template')
      // We should wait in order the search to be completed
      cy.wait(1000)
      cy.contains('automated_template_edited').should('exist')
    })
  })

  context('Test for checking if you can create a template through edit mode', () => {
    it('should be able to create a template', () => {
      cy.get('#resource-list > tbody > tr:last > td:last > a', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-new-template"]').click()
      cy.url().should('contain', '/new')
    })
  })
})
