/// <reference types="cypress" />
import { provisionAll } from '../../../../../provision/list'

const adminURL = Cypress.env('ADMIN_URL')

describe('Testing the sidebar custom logo', () => {
  before(() => {
    cy.seedDb(provisionAll)
    cy.preTestLogin({ url: adminURL })
    cy.visit(adminURL + '/')
  })

  context('Testing the sidebar custom logo', () => {
    it('should be able to set a default logo', () => {
      cy.get('[data-test-id="sidebar"]', { timeout: 10000 })
        .find('a[href="/ui"]')
        .click({ force: true })
      cy.get('[data-test-id="drop-area"]:eq()')
        .get('input[type="file"]:eq()')
        .selectFile('cypress/fixtures/images/yin_yang.png', { force: true })
      cy.get('[data-test-id="button-submit"]:last').click({ force: true })
      cy.get('[data-test-id="img-main-logo"]', { timeout: 10000 })
        .should('have.attr', 'src')
        .should('include', 'attachment')
    })
  })
})