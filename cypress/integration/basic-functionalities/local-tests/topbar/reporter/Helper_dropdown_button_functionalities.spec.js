/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first run the Server test 2 in order to create a user so you can log in.
describe('Test helper dropdown functionalities', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for opening up the forum page', () => {
    it('should be able to access the forum page', () => {
      cy.get('[data-test-id="dropdown-helper-forum"]').click({ force: true })
    })
  })

  context('Test for opening up the documentation page', () => {
    it('should be able to open corteza documentation', () => {
      cy.get('[data-test-id="dropdown-helper-docs"]').click({ force: true })
    })
  })

  context('Test for using the send feedback feature', () => {
    it('should be able to use the send feedback feature', () => {
      // We wait for 10s in order the send feedback feature to be fully loaded and open in separate modal
      cy.wait(10000)
      cy.get('[data-test-id="dropdown-helper-feedback"]').click({ force: true })
    })
  })
})
