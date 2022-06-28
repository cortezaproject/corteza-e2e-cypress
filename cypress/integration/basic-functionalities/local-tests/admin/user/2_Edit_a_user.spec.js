/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up and create a user
describe('Test for editing a user', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for checking that delete, suspend, revoke and new buttons are displayed when in edit mode', () => {
    it('should be displayed when editing a user', () => {
      cy.wait(2000) // We wait for 2s in order the page to be fully loaded/rendered
      cy.get('.nav-sidebar').contains('Users').click()
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="button-new-user"]').should('exist')
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').should('exist')
        cy.get('[data-test-id="button-status"]').should('exist')
        cy.get('[data-test-id="button-sessions-revoke"]').should('exist')
      })
    })
  })

  context('Test for editing a user', () => {
    it('should be able to edit the user', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').clear().type('edited@email.com')
        cy.get('[data-test-id="input-name"]').clear().type('Edited automated name')
        cy.get('[data-test-id="input-handle"]').clear().type('edited_handle')
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
    })
  })

  context('Test for checking if the user got edited', () => {
    it('should be edited', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').should('have.value', 'edited@email.com')
        cy.get('[data-test-id="input-name"]').should('have.value', 'Edited automated name')
        cy.get('[data-test-id="input-handle"]').should('have.value', 'edited_handle')
        cy.get('[data-test-id="input-updated-at"]').should('exist')
      })
      cy.get('.nav-sidebar').contains('Users').click()
      cy.contains('Edited automated name').should('exist')
    })
  })

  context('Test for checking if you can create a user through edit mode', () => {
    it('should be able to create a user', () => {
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="button-new-user"]').click()
      cy.url().should('contain', '/new')
    })
  })
})
