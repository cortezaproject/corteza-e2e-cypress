/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first run the Server test 2 in order to create a user so you can log in
// and after that you need to run the reporter test 1_Create_a_report.spec.js in order to create a report so you can edit it
describe('Test for editing a report', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for editing a report', () => {
    it('should be able to edit the name, the handle and the description', () => {
      // We click on the Edit button on the created report
      cy.get('table > tbody > :first-child() > :last-child() > a:nth-child(2)').click()
      cy.get('[data-test-id="input-name"]').clear().type('Edited cypress report')
      cy.get('[data-test-id="input-handle"]').clear().type('cypress_handle_edited')
      cy.get('[data-test-id="input-description"]').clear().type('This is an edited automated description.')
      cy.get('[data-test-id="button-save"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success')

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
      cy.visit(baseURL + '/list')
    })
  })
})
