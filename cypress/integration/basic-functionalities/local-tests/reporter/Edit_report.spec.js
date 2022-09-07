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
      cy.visit(reporterURL + '/list')
      // We click on the Edit button on the created report
      cy.get('table > tbody > :first-child() > :last-child() > a:nth-child(2)').click()
      cy.get('[data-test-id="input-name"]').clear().type('Edited cypress report')
    })

    it('should be able to edit the handle', () => {
      cy.get('[data-test-id="input-handle"]').clear().type('cypress_handle_edited')
    })

    it('should be able to edit the description', () => {
      cy.get('[data-test-id="input-description"]').clear().type('This is an edited automated description.')
      cy.get('[data-test-id="button-save"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success')
    })

    it('should be edited', () => {
      cy.get('[data-test-id="input-name"]').should('have.value', 'Edited cypress report')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'cypress_handle_edited')
      cy.get('[data-test-id="input-description"]').should('have.value', 'This is an edited automated description.')
    })

    it('should be able to check if the name was changed in the report builder', () => {
      cy.get('[data-test-id="button-report-builder"]').click()
      cy.contains('Edited cypress report')
      cy.get('[data-test-id="button-back"]').click()
      // We click on the edited report
      cy.get('table > tbody > :first-child()').click()
      // We check that an error toast doesn't appear
      cy.get('.b-toast-danger').should('not.exist')
      // Visiting main page of Reporter
      cy.visit(reporterURL + '/list')
    })
  })
})
