/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for logging in and its functionalities', () => {
  // Tests below starting from here are testing the log in and remember me button
  context('Test for logging in with not registered email', () => {
    it('should not be able to log in and be remembered', () => {
      cy.login({ email: 'email@email.com', password })
      // We check if the error toast appears
      cy.get('[data-test-id="error"]')
    })
  })

  context('Test for logging in with not registered password', () => {
    it('should not be able to log in and be remembered', () => {
      cy.login({ email, password: 'password' })
      // We check if the error toast appears
      cy.get('[data-test-id="error"]')
    })
  })

  context('Test for logging in with no data entered', () => {
    it('should not be able to log in and be remembered', () => {
      cy.login({})
      cy.url().should('be.equal', baseURL + '/auth/login')
    })
  })

  context('Test for logging in with just an email entered', () => {
    it('should not be able to log in and be remembered', () => {
      cy.login({ email })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })
  })

  context('Test for logging in with just a password entered', () => {
    it('should not be able to log in and be remembered', () => {
      cy.login({ password })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })
  })

  context('Test for logging in with the already created user and be remembered from server signup test 2', () => {
    it('should be able to log in and be remembered successfully', () => {
      cy.login({ email, password })
      // We check if the success toast appears
      cy.get('.border-primary')
    })
  })

  // Tests below starting from here are testing the log in button
  context('Test for logging in with not registered email', () => {
    it('should not be able to log in', () => {
      cy.login({ email: 'email@email.com', password, buttonLoginID: 'button-login' })
      // We check if the error toast appears
      cy.get('[data-test-id="error"]')
    })
  })

  context('Test for logging in with not registered password', () => {
    it('should not be able to log in', () => {
      cy.login({ email, password: 'password', buttonLoginID: 'button-login' })
      // We check if the error toast appears
      cy.get('[data-test-id="error"]')
    })
  })

  context('Test for logging in with no data entered', () => {
    it('should not be able to log in', () => {
      cy.login({ buttonLoginID: 'button-login' })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })
  })

  context('Test for logging in with just an email entered', () => {
    it('should not be able to log in', () => {
      cy.login({ email, buttonLoginID: 'button-login' })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })
  })

  context('Test for logging in with just a password entered', () => {
    it('should not be able to log in', () => {
      cy.login({ password, buttonLoginID: 'button-login' })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })
  })

  context('Test for logging in with the already created user from server signup test 2', () => {
    it('should be able to log in successfully', () => {
      cy.login({ email, password, buttonLoginID: 'button-login' })
      // We check if the success toast appears
      cy.get('.border-primary')
    })
  })
})
