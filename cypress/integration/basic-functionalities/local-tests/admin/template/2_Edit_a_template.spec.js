/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up and create a user
describe('Test for editing a template', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for checking that new, delete and submit buttons are displayed when in edit mode', () => {
    it('should be displayed when editing a template', () => {
      // We wait for 2s in order the page to be fully loaded/rendered
      cy.wait(2000)
      cy.get('.nav-sidebar').contains('Templates').click()
      cy.get('[data-test-id="input-search"]').type('automated_template')
      // We wait 2s in order the search to be completed
      cy.wait(2000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
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
      cy.contains('automated_template_edited').should('exist')
    })
  })

  context('Test for checking if you can create a template through edit mode', () => {
    it('should be able to create a template', () => {
      // We wait 2s in order the search to be completed
      cy.wait(2000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="button-new-template"]').click()
      cy.url().should('contain', '/new')
    })
  })
})
