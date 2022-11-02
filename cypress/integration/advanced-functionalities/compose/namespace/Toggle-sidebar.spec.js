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
    it('should be enabled by default', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="input-search"]').type('crm')
      cy.wait(2000)
      cy.get('tbody').click()
      cy.get('[data-test-id="checkbox-show-sidebar"]').should('not.be.checked') 
      cy.get('[data-test-id="button-visit-namespace"]').click()
      cy.get('aside .b-sidebar-body > div').should('exist')
    })
    
    it('should be able to disable it', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="input-search"]').type('crm')
      cy.wait(2000)
      cy.get('tbody').click()
      cy.get('[data-test-id="checkbox-show-sidebar"]').check({ force: true })
      cy.get('[data-test-id="checkbox-show-sidebar"]').should('be.checked')
      cy.get('[data-test-id="button-save"]').click()
      cy.get('[data-test-id="button-visit-namespace"]').click()
      cy.wait(2000)
      cy.get('aside .b-sidebar-body > div').should('not.exist')
    })
  })
})
