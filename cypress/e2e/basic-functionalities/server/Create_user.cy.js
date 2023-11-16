// Will probably be refactored into a provisioning script or something similar
// because without this file the other tests fail
/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a user', () => {
  context('Test for creating a user with misconfigured parameter', () => {
    it('should not be able to create an account without any info entered', () => {
      cy.visit(baseURL + '/auth/signup')
      cy.get('[data-test-id="button-submit"]').click()
      cy.url().should('be.equal', baseURL + '/auth/signup')
    })

    it('should not be able to create an account with just an email entered', () => {
      cy.visit(baseURL + '/auth')
      cy.get('[data-test-id="link-signup"]').click()
      cy.get('[data-test-id="input-email"]').type('cypress@test.com')
      cy.get('[data-test-id="button-submit"]').click()
      cy.url().should('be.equal', baseURL + '/auth/signup')
    })

    it('should not be able to create an account due to a misconfigured email', () => {
      cy.visit(baseURL + '/auth/signup')
      // Type in misconfigured email to trigger invalid email error
      cy.get('[data-test-id="input-email"]').type('cypress_email')
      cy.get('[data-test-id="input-password"]').type('password')
      cy.get('[data-test-id="input-name"]').type('cypress account')
      cy.get('[data-test-id="button-submit"]').click()
      cy.url().should('be.equal', baseURL + '/auth/signup')
    })

    it('should not be able to create an account due to a misconfigured password', () => {
      cy.visit(baseURL + '/auth/signup')
      cy.get('[data-test-id="input-email"]').type('cypress@test.com')
      // Type in misconfigured password to trigger invalid password error
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

    it('should not be able to create an account with just a name entered', () => {
      cy.visit(baseURL + '/auth/signup')
      cy.get('[data-test-id="input-name"]').type('Cypress Test')
      cy.get('[data-test-id="button-submit"]').click()
      cy.url().should('be.equal', baseURL + '/auth/signup')
    })
  })

  context('Test for creating a user in corteza', () => {
    it('should be able to write signup credentials, create an account and log in', () => {
      cy.visit(baseURL + '/auth') 
      cy.get('[data-test-id="link-signup"]').click()
      cy.get('[data-test-id="input-email"]').type(email)
      cy.get('[data-test-id="input-password"]').type(password)
      cy.get('[data-test-id="input-name"]').type('Cypress test account')
      cy.get('[data-test-id="button-submit"]').click()
      cy.url('pathname').should('include', '/auth')
    })
  })
})
