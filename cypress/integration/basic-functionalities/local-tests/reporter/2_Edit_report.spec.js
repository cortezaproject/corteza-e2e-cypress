/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
// Before running this test first run the Server test 2 in order to create a user so you can log in
// and after that you need to run the reporter test 1_Create_a_report.spec.js in order to create a report so you can edit it
describe('Test for editing a report', () => {
  context('Test for logging in the user', () => {
    it('should be able to log in successfully', () => {
      cy.visit(baseURL + '/') // Localhost in the env file should be changed to reflect the Reporter host. We are visiting the main authentication page here.
      cy.get('[data-test-id="input-email"]').type('cypress@test.com')
      cy.get('[data-test-id="input-password"]').type('cypress123')
      cy.get('[data-test-id="button-login-and-remember"]').click()
      cy.visit(baseURL + '/list') // Visiting main page of Reporter
    })
  })

  context('Test for editing a report', () => {
    it('should be able to edit the name, the handle and the description', () => {
      cy.get('table > tbody > :first-child() > :last-child() > a:nth-child(2)').click() // We click on the Edit button on the created report
      cy.get('[data-test-id="input-name"]').clear().type('Edited cypress report')
      cy.get('[data-test-id="input-handle"]').clear().type('cypress_handle_edited')
      cy.get('[data-test-id="input-description"]').clear().type('This is an edited automated description.')
      cy.get('[data-test-id="button-save"]').click()

      cy.get('.b-toast-success') // We check if the success toast appears
      
      cy.get('[data-test-id="input-name"]').should('have.value', 'Edited cypress report')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'cypress_handle_edited')
      cy.get('[data-test-id="input-description"]').should('have.value', 'This is an edited automated description.')
    })

    it('should be able to check if the name was changed in the report builder', () => {
      cy.get('[data-test-id="button-report-builder"]').click()
      cy.contains('Edited cypress report')
      cy.get('[data-test-id="button-back"]').click()
      cy.get('table > tbody > :first-child()').click() // We click on the edited report
      cy.get('.b-toast-danger').should('not.exist') // We check that an error toast doesn't appear
      cy.visit(baseURL + '/list') // Visiting main page of Reporter
    })
  })
})
