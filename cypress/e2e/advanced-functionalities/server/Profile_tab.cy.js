/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')

describe('Testing your profile tab in server', () => {
  context('Testing your profile tab', () => {
    it('should be able to change the name, handle and preferred language', () => {
      cy.visit(baseURL + '/auth/login')
      cy.get('[data-test-id="input-name"]').should('exist').type(' edited')
      cy.get('[data-test-id="input-handle"]').should('exist').type('_edited')
      cy.get('[data-test-id="select-language"]').should('exist').select('de', { force: true })
      cy.get('[data-test-id="button-submit"]').click({ force: true })
    })

    it('should save the changes and check whether the values has been changed', () => {
      cy.get('[data-test-id="input-name"]').should('have.value', 'Cypress test account edited')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'testovemaill01_edited')
      cy.get('[data-test-id="select-language"]').should('exist', 'German (Deutsch)')
    })

    it('should be able to switch the language to english', () => {
      cy.get('[data-test-id="select-language"]', { timeout: 10000 })
        .should('exist')
        .select('en', { force: true })
      cy.get('[data-test-id="select-language"]').should('exist', 'English (English)')
      cy.get('[data-test-id="button-submit"]').click({ force: true })
    })
  })
})
