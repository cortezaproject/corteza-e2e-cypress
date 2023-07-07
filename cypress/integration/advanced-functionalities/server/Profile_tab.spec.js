/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing your profile tab in server', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: baseURL })
    }
  })

  context('Testing your profile tab', () => {
    it('should be able to change the name, handle and preferred language', () => {
      cy.visit(baseURL + '/auth/login')
      cy.get('[data-test-id="input-name"]').should('exist').type(' edited')
      cy.get('[data-test-id="input-handle"]').should('exist').type('_edited')
      cy.get('[data-test-id="select-language"]').should('exist').select('German (Deutsch)')
      cy.get('[data-test-id="button-submit"]').click()
    })

    it('should save the changes and check whether the values has been changed', () => {
      cy.get('[data-test-id="input-name"]').should('have.value', 'Cypress test account edited')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'testovemaill01_edited')
      cy.get('[data-test-id="select-language"]').should('exist', 'German (Deutsch)')
    })

    it('should be able to switch the language to english', () => {
      cy.get('[data-test-id="select-language"]').should('exist').select('English (English)')
      cy.get('[data-test-id="select-language"]').should('exist', 'English (English)')
    })
  })
})
