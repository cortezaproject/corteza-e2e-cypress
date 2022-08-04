/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for checking the log in and be remembered button functionality', () => {
  context('Test for logging in and be remembered with missing data or misconfiguration', () => {
    it('should not be able to log in and be remembered with not registered email', () => {
      cy.login({ email: 'email@email.com', password })
      // We check if the error toast appears
      cy.get('[data-test-id="error"]')
    })

    it('should not be able to log in and be remembered with not registered password', () => {
      cy.login({ email, password: 'password' })
      // We check if the error toast appears
      cy.get('[data-test-id="error"]')
    })

    it('should not be able to log in and be remembered with no data entered', () => {
      cy.login({})
      cy.url().should('be.equal', baseURL + '/auth/login')
    })

    it('should not be able to log in and be remembered with just an email entered', () => {
      cy.login({ email })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })

    it('should not be able to log in and be remembered with just a password entered', () => {
      cy.login({ password })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })
  })

  context('Test for logging in and be remembered successfully', () => {
    it('should be able to log in and be remembered successfully when correct password and email are entered', () => {
      cy.login({ email, password })
      // We check if the success toast appears
      cy.get('.border-primary')
    })
  })
})

describe('Test for checking the log in button functionality', () => {
  context('Test for logging in with missing data or misconfiguration', () => {
    it('should not be able to log in with not registered email', () => {
      cy.login({ email: 'email@email.com', password, buttonLoginID: 'button-login' })
      // We check if the error toast appears
      cy.get('[data-test-id="error"]')
    })

    it('should not be able to log in with not registered password', () => {
      cy.login({ email, password: 'password', buttonLoginID: 'button-login' })
      // We check if the error toast appears
      cy.get('[data-test-id="error"]')
    })

    it('should not be able to log in with no data entered', () => {
      cy.login({ buttonLoginID: 'button-login' })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })

    it('should not be able to log in with just an email entered', () => {
      cy.login({ email, buttonLoginID: 'button-login' })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })

    it('should not be able to log in with just a password entered', () => {
      cy.login({ password, buttonLoginID: 'button-login' })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })
  })
  
  context('Test for logging in successfully', () => {
    it('should be able to log in successfully when correct password and email are entered', () => {
      cy.login({ email, password, buttonLoginID: 'button-login' })
      // We check if the success toast appears
      cy.get('.border-primary')
    })
  })
})
