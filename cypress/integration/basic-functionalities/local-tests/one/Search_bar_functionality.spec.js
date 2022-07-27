/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up
describe('Test for creating a role', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for searching a non existing app', () => {
    it('should not be able to search for a non existing app', () => {
      // Here we close the start tour pop up
      cy.get('.modal-header > :last-child()').click()
      cy.get('[data-test-id="input-search"]').type('xw')
      cy.get('[data-test-id="heading-no-apps"]').should('exist')
    })
  })

  context('Test for searching an existing app', () => {
    it('should be able to search for the Admin Area', () => {
      cy.get('[data-test-id="input-search"]').clear().type('admin')
      cy.get('[data-test-id="Admin Area"]').click({ force: true })
      cy.url().should('exist', baseURL + '/admin')
    })

    it('should be able to search for the Low Code (Compose)', () => {
      // Here we close the start tour pop up
      cy.get('.modal-header > :last-child()').click()
      cy.get('[data-test-id="input-search"]').clear().type('low code')
      cy.get('[data-test-id="Low Code"]').click({ force: true })
      cy.url().should('exist', baseURL + '/compose')
    })
  })
})
