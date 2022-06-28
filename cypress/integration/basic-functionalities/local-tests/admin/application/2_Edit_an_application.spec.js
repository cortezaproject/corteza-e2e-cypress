/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up and create a user
describe('Test for editing an application', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for checking that new and delete buttons are displayed when in edit mode', () => {
    it('should be displayed when editing a template', () => {
      cy.wait(2000) // We wait for 2s in order the page to be fully loaded/rendered
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="input-search"]').type('automated application')
      cy.wait(2000) // We wait 2s in order the search to be completed
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="button-new-application"]').should('exist')
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').should('exist')
      })
    })
  })

  context('Test for editing an application', () => {
    it('should be able to edit the application', () => {
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').clear().type('edited application')
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
    })
  })

  context('Test for checking if the template got edited', () => {
    it('should be edited', () => {
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').should('have.value', 'edited application')
        cy.get('[data-test-id="input-updated-at"]').should('exist')
      })
      cy.get('.nav-sidebar').contains('Application').click()
      cy.get('[data-test-id="input-search"]').type('edited application')
      cy.contains('edited application').should('exist')
    })
  })

  context('Test for checking if you can create a template through edit mode', () => {
    it('should be able to create a template', () => {
      cy.wait(2000) // We wait 2s in order the search to be completed
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="button-new-application"]').click()
      cy.url().should('contain', '/new')
    })
  })
})
