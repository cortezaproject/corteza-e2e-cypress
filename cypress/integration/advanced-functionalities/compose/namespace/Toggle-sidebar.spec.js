/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing enable sidebar', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test for enabling sidebar on a namespace', () => {
    it('should be disabled by default', () => {
      cy.intercept('/api/compose/namespace/').as('namespace-list')
      cy.intercept('/api/compose/namespace/?query=case&limit=100&incTotal=true&pageCursor=&sort=name+ASC').as('search')
      cy.visit(composeURL + '/namespaces')
      cy.wait('@namespace-list')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="input-search"]').type('case')
      cy.wait('@search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="checkbox-show-sidebar"]').should('not.be.checked') 
      cy.get('[data-test-id="button-visit-namespace"]').click()
      cy.get('[data-test-id="select-namespace"]').should('exist')
    })
    
    it('should enable it', () => {
      cy.get('[data-test-id="button-namespace-edit"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="checkbox-show-sidebar"]').check({ force: true })
      cy.get('[data-test-id="checkbox-show-sidebar"]').should('be.checked')
      cy.get('[data-test-id="button-save"]').click()
      cy.get('[data-test-id="button-visit-namespace"]').click()
      cy.get('[data-test-id="select-namespace"]').should('not.exist')
    })
  })
})
