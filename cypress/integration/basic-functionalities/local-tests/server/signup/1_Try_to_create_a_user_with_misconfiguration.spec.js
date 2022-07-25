/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

describe('Test for creating a user with misconfigured parameter', () => {
  context('Test for creating a user with misconfigured email', () => {
    it('should not be able to create an account with just an email entered', () => {
      // When running this test make sure that the base url is set to localhost:3000
      cy.visit(baseURL + '/')
      cy.get('[data-test-id="link-signup"]').click()
      cy.get('[data-test-id="input-email"]').type('cypress@test.com')
      cy.get('[data-test-id="button-submit"]').click()
      cy.url().should('be.equal', baseURL + '/auth/signup')
    })

    it('should not be able to create an account due to a misconfigured email', () => {
      cy.visit(baseURL + '/auth/signup')
      // This will be left like this so it is misconfigured and we receive an error/warning
      cy.get('[data-test-id="input-email"]').type('cypress_email')
      cy.get('[data-test-id="input-password"]').type('password')
      cy.get('[data-test-id="input-name"]').type('cypress account')
      cy.get('[data-test-id="input-handle"]').type('cypress_handle')
      cy.get('[data-test-id="button-submit"]').click()
      cy.url().should('be.equal', baseURL + '/auth/signup')
    })
  })

  context('Test for creating a user with misconfigured password', () => {
    it('should not be able to create an account due to a misconfigured password', () => {
      cy.visit(baseURL + '/auth/signup')
      cy.get('[data-test-id="input-email"]').type('cypress@test.com')
      // This will be left like this so it is misconfigured and we receive an error/warning
      cy.get('[data-test-id="input-password"]').type('p')
      cy.get('[data-test-id="button-submit"]').click()
      cy.get('[data-test-id="error"]')
    })

    it('should not be able to create an account with just a password entered', () => {
      cy.visit(baseURL + '/auth/signup')
      cy.get('[data-test-id="input-password"]').type('Cypress123$')
      cy.get('[data-test-id="button-submit"]').click()
      cy.url().should('be.equal', baseURL + '/auth/signup')
    })
  })

  context('Test for creating a user with no info entered', () => {
    it('should not be able to create an account due to a missing information', () => {
      cy.visit(baseURL + '/auth/signup')
      cy.get('[data-test-id="button-submit"]').click()
      cy.url().should('be.equal', baseURL + '/auth/signup')
    })
  })

  context('Test for creating a user with just a name entered', () => {
    it('should not be able to create an account with just a name entered', () => {
      cy.visit(baseURL + '/auth/signup')
      cy.get('[data-test-id="input-name"]').type('Cypress Test')
      cy.get('[data-test-id="button-submit"]').click()
      cy.url().should('be.equal', baseURL + '/auth/signup')
    })
  })

  context('Test for creating a user with just a handle entered', () => {
    it('should not be able to create an account with just a handle entered', () => {
      cy.visit(baseURL + '/auth/signup')
      cy.get('[data-test-id="input-handle"]').type('cypress_handle')
      cy.get('[data-test-id="button-submit"]').click()
      cy.url().should('be.equal', baseURL + '/auth/signup')
    })
  })
})
