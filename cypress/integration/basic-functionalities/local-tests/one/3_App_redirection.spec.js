/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first run the Server test 2 in order to create a user so you can log in.
describe('Test for app redirection', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('This is a function for app redirection', () => {
    it('should be able to redirect to the specified app', () => {
      cy.get('.modal-header > :last-child()').click() // Here we close the start tour pop up
      cy.get('[data-test-id="Low Code"]').click({ force: true })
      cy.get('.modal-footer > :first-child()').click() // Here we click on the skip tour button
      cy.get('[data-test-id="CRM Suite"]').click({ force: true })
      cy.get('[data-test-id="Case Management"]').click({ force: true })
      cy.get('[data-test-id="Admin Area"]').click({ force: true })
      cy.get('[data-test-id="Workflows"]').click({ force: true })
      cy.get('[data-test-id="Reporter"]').click({ force: true })
      cy.get('[data-test-id="Jitsi Bridge"]').click({ force: true })
    })
  })
})
