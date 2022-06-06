/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

describe('Test for logging in', () => {
  context('Test for logging in with the already created user', () => {
    it('should be able to log in successfully', () => {
      cy.login()
    })
  })
})
