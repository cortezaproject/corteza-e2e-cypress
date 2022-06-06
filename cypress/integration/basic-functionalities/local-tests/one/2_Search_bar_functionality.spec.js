/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

// Before running this test first run the Server test 2 in order to create a user so you can log in.
describe('Test search bar functionality', () => {
  before(() => {
    cy.login()
  })

  context('Test for searching the Admin Area', () => {
    it('should be able to search for the Admin Area', () => {
      cy.get('.modal-header > :last-child()').click() // Here we close the start tour pop up
      cy.get('[data-test-id="input-search"]').type('admin')
      cy.get('[data-test-id="Admin Area"]').click({ force: true })
    })
  })

  context('Test for searching the CRM', () => {
    it('should be able to search for the CRM', () => {
      cy.get('.modal-header > :last-child()').click() // Here we close the start tour pop up
      cy.get('[data-test-id="input-search"]').type('CRM')
      cy.get('[data-test-id="CRM Suite"]').click({ force: true })
    })
  })

  context('Test for searching the Low Code', () => {
    it('should be able to search for the Low Code', () => {
      cy.get('.modal-header > :last-child()').click() // Here we close the start tour pop up
      cy.get('[data-test-id="input-search"]').clear().type('low code')
      cy.get('[data-test-id="Low Code"]').click({ force: true })
    })
  })

  context('Test for searching the Workflows', () => {
    it('should be able to search for the Workflows', () => {
      cy.get('.modal-header > :last-child()').click() // Here we close the start tour pop up
      cy.get('[data-test-id="input-search"]').clear().type('workflow')
      cy.get('[data-test-id="Workflows"]').click({ force: true })
    })
  })

  context('Test for searching the Reporter', () => {
    it('should be able to search for the Reporter', () => {
      cy.get('.modal-header > :last-child()').click() // Here we close the start tour pop up
      cy.get('[data-test-id="input-search"]').clear().type('reporter')
      cy.get('[data-test-id="Reporter"]').click({ force: true })
    })
  })

  context('Test for searching the Case Management', () => {
    it('should be able to search for the Case Management', () => {
      cy.get('.modal-header > :last-child()').click() // Here we close the start tour pop up
      cy.get('[data-test-id="input-search"]').clear().type('case management')
      cy.get('[data-test-id="Case Management"]').click({ force: true })
    })
  })

  context('Test for searching the Jitsi Bridge', () => {
    it('should be able to search for the Jitsi Bridge', () => {
      cy.get('.modal-header > :last-child()').click() // Here we close the start tour pop up
      cy.get('[data-test-id="input-search"]').clear().type('jitsi')
      cy.get('[data-test-id="Jitsi Bridge"]').click({ force: true })
    })
  })
})
