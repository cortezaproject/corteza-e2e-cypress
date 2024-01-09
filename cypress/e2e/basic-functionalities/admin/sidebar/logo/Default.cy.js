/// <reference types="cypress" />
import { provisionAll } from '../../../../../provision/list'

const adminURL = Cypress.env('ADMIN_URL')

describe('Testing the sidebar default logo', () => {
  before(() => {
    cy.seedDb(provisionAll)
    cy.preTestLogin({ url: adminURL })
    cy.visit(adminURL + '/')
  })

  context('Testing the sidebar default logo', () => {
    it('should be able to see the default logo', () => {
      cy.get('[data-test-id="img-main-logo"]', { timeout: 10000 })
        .should('have.attr', 'src')
        .should('include', 'assets')
    })
  })
})
