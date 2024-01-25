/// <reference types="cypress" />
import { provisionAll } from '../../../../../provision/list'

const adminURL = Cypress.env('ADMIN_URL')
const composeURL = Cypress.env('COMPOSE_URL')

describe('Testing the sidebar custom logo', () => {
  before(() => {
    cy.seedDb(provisionAll)
    cy.preTestLogin({ url: composeURL })
  })
  
  context('Testing adding custom logo in admin', () => {
    it('should be able to set a custom logo', () => {
      cy.visit(adminURL + '/')
      cy.get('[data-test-id="sidebar"]', { timeout: 10000 })
        .find('a[href="/ui"]')
        .click({ force: true })
      cy.get('[data-test-id="drop-area"]:eq()')
        .get('input[type="file"]:eq()')
        .selectFile('cypress/fixtures/images/yin_yang.png', { force: true })
      cy.get('[data-test-id="button-submit"]:first', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="img-main-logo"]', { timeout: 10000 })
        .should('have.attr', 'src')
        .should('include', 'attachment')
    })
  })

  context('Testing custom logo in compose', () => {
    it('should check if custom logo is set', () => {
      cy.preTestLogin({ url: composeURL })
      cy.visit(composeURL + '/namespaces')
      cy.searchItem({ item: 'crm' })
      // We need to visit a namespace so that the sidebar will be present
      cy.get('[data-test-id="link-visit-namespace-crm"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="img-main-logo"]')
        .should('have.attr', 'src')
        .should('include','attachment')
    })
  })
})
