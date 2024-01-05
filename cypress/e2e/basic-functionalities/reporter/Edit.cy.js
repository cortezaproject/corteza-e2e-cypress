/// <reference types="cypress" />
const reporterURL = Cypress.env('REPORTER_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for editing a report', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: reporterURL })
    }
  })

  context('Test for editing a report', () => {
    it('should be able to edit the name', () => {
      cy.intercept('/api/system/reports/?query=&limit=100&incTotal=true&sort=handle+ASC')
        .as('reports')
      cy.intercept('/api/system/reports/?query=cypress_handle&limit=100&incTotal=true&pageCursor=&sort=handle+ASC')
        .as('report-search')
      cy.visit(reporterURL + '/list')
      cy.wait('@reports')
      cy.get('[data-test-id="input-search"]').type('cypress_handle')
      cy.wait('@report-search')
      cy.get('[data-test-id="button-report-edit"]').click({ force: true })
      cy.get('[data-test-id="input-name"]').clear().type('Edited cypress report')
    })

    it('should be able to edit the handle', () => {
      cy.get('[data-test-id="input-handle"]').clear().type('cypress_handle_edited')
    })

    it('should be able to edit the description', () => {
      cy.get('[data-test-id="input-description"]').clear().type('This is an edited automated description.')
      cy.get('[data-test-id="button-save"]').click({ force: true })
    })

    it('should be edited', () => {
      cy.get('[data-test-id="input-name"]').should('have.value', 'Edited cypress report')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'cypress_handle_edited')
      cy.get('[data-test-id="input-description"]').should('have.value', 'This is an edited automated description.')
    })

    it('should be able to check if the name was changed in the report builder', () => {
      cy.get('[data-test-id="button-report-builder"]').click({ force: true })
      cy.contains('Edited cypress report')
      cy.get('[data-test-id="button-back"]').click({ force: true })
    })
  })
})
