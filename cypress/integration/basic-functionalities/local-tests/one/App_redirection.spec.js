/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for app redirection', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('This is a function for app redirection', () => {
    it('should be able to redirect to the specified app', () => {
      // Here we close the start tour pop up
      cy.get('.modal-header > :last-child()').click() 
      cy.get('[data-test-id="Low Code"]').click({ force: true })
      // Here we click on the skip tour button
      cy.get('.modal-footer > :first-child()').click() 
      cy.get('[data-test-id="CRM Suite"]').click({ force: true })
      cy.get('[data-test-id="Case Management"]').click({ force: true })
      cy.get('[data-test-id="Admin Area"]').click({ force: true })
      cy.get('[data-test-id="Workflows"]').click({ force: true })
      cy.get('[data-test-id="Reporter"]').click({ force: true })
      cy.get('[data-test-id="Jitsi Bridge"]').click({ force: true })
    })
  })
})
