/// <reference types="cypress" />
import { provisionAll, provisionDefaultNamespaceCreate } from '../../../../provision/list'

const composeURL = Cypress.env('COMPOSE_URL')

describe('Test for editing a record', () => {
  before(() => {
    cy.seedDb([...provisionAll, ...provisionDefaultNamespaceCreate])
    cy.preTestLogin({ url: composeURL })
    cy.visit(composeURL + '/namespaces')
  })
  
  context('Test for cloning a namespace', () => {
    it('should be able to clone a namespace', () => {
      cy.intercept('/api/compose/namespace/?query=&limit=100&incTotal=true&sort=name+ASC')
        .as('ns-manage')
      cy.intercept('/api/compose/namespace/?query=cypress&limit=100&incTotal=true&pageCursor=&sort=name+ASC')
        .as('ns-search')
      cy.get('[data-test-id="button-manage-namespaces"]').click({ force: true })
      cy.wait('@ns-manage')
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.wait('@ns-search')
      cy.get('tbody').contains('cypress').should('exist').click({ force: true })
      cy.get('[data-test-id="button-clone"]').click({ force: true })
      cy.url().should('contain', '/clone/')
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.url().should('contain', '/edit')
    })
  })
})