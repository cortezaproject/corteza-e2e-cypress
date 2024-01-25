/// <reference types="cypress" />
import { provisionAll } from '../../../provision/list'

const oneURL = Cypress.env('ONE_URL')

describe('Test for checking the search bar functionality', () => {
  before(() => {
    cy.seedDb(provisionAll)
  })

  beforeEach(() => {
    cy.preTestLogin({ url: oneURL })
    cy.visit(oneURL + '/')
    // Close tour pop up
    cy.get('.modal-header > :last-child()').click({ force: true })
  })

  context('Test for searching a non existing app', () => {
    it('should not be able to search for a non existing app', () => {
      cy.searchItem({ item: 'xw' })
      cy.get('[data-test-id="heading-no-apps"]', { timeout: 10000 }).should('exist')
    })
  })

  context('Test for searching an existing app', () => {
    it('should be able to search for the Admin Area', () => {
      cy.searchItem({ item: 'admin' })
      cy.get('[data-test-id="Admin Area"]', { timeout: 10000 }).click({ force: true })
      cy.url().should('exist', oneURL + '/admin')
    })
  })
})
