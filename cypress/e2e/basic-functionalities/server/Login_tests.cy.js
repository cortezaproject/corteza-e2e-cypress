/// <reference types="cypress" />
import { provisionAll } from '../../../provision/list'

const baseURL = Cypress.env('HOST')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for checking the log in and be remembered button functionality', () => {
  before(() => {
    cy.seedDb(provisionAll)
  })

  context('Test for logging in and be remembered with missing data or misconfiguration', () => {
    it('should not be able to log in and be remembered with not registered email', () => {
      cy.login({ email: 'email@email.com', password, url: baseURL })
      // We check if the error toast appears
      cy.get('[data-test-id="error"]')
    })

    it('should not be able to log in and be remembered with not registered password', () => {
      cy.login({ email, password: 'password', url: baseURL })
      // We check if the error toast appears
      cy.get('[data-test-id="error"]')
    })

    it('should not be able to log in and be remembered with no data entered', () => {
      cy.login({ url: baseURL })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })

    it('should not be able to log in and be remembered with just an email entered', () => {
      cy.login({ email, url: baseURL  })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })

    it('should not be able to log in and be remembered with just a password entered', () => {
      cy.login({ password, url: baseURL  })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })
  })

  context('Test for logging in and be remembered successfully', () => {
    it('should be able to log in and be remembered successfully when correct password and email are entered', () => {
      cy.login({ email, password, url: baseURL  })
      // We check if the success toast appears
      cy.get('.border-primary')
    })
  })
})

describe('Test for checking the log in button functionality', () => {
  context('Test for logging in with missing data or misconfiguration', () => {
    it('should not be able to log in with not registered email', () => {
      cy.login({ email: 'email@email.com', password, buttonLoginID: 'button-login', url: baseURL  })
      // We check if the error toast appears
      cy.get('[data-test-id="error"]')
    })

    it('should not be able to log in with not registered password', () => {
      cy.login({ email, password: 'password', buttonLoginID: 'button-login', url: baseURL  })
      // We check if the error toast appears
      cy.get('[data-test-id="error"]')
    })

    it('should not be able to log in with no data entered', () => {
      cy.login({ buttonLoginID: 'button-login', url: baseURL  })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })

    it('should not be able to log in with just an email entered', () => {
      cy.login({ email, buttonLoginID: 'button-login', url: baseURL  })
      cy.url().should('be.equal', baseURL + '/auth/login')
    })

    it('should not be able to log in with just a password entered', () => {
      cy.login({ password, buttonLoginID: 'button-login', url: baseURL })
      cy.url().should('be.equal', baseURL + '/auth/login', { timeout: 10000 })
    })
  })
  
  context('Test for logging in successfully', () => {
    it('should be able to log in successfully when correct password and email are entered', () => {
      cy.login({ email, password, buttonLoginID: 'button-login', url: baseURL  })
      // We check if the success toast appears
      cy.get('.border-primary')
    })
  })
})
