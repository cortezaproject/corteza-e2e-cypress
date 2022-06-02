/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
// Before running this test first run the Server test 2 in order to create a user so you can log in
// and after that you need to run the reporter test 1_Create_a_report.spec.js in order to create a report so you can delete it
describe('Test for deleting a report', () => {
  context('Test for logging in the user', () => {
    it('should be able to log in successfully', () => {
      cy.visit(baseURL + '/') // Localhost in the env file should be changed to reflect the Reporter host. We are visiting the main authentication page here.
      cy.get('[data-test-id="input-email"]').type('cypress@test.com')
      cy.get('[data-test-id="input-password"]').type('cypress123')
      cy.get('[data-test-id="button-login-and-remember"]').click()
      cy.visit(baseURL + '/list') // Visiting main page of Reporter
    })
  })

  context('Test for deleting a report', () => {
    it('should be able to delete a report successfully', () => {
      cy.get('table > tbody > :first-child() > :last-child() > a:nth-child(2)').click() // We click on the Edit button on the created report
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      cy.get('.b-toast-success') // We check if the success toast appears
      cy.contains('cypress_handle').should('not.exist')
    })
  })
})
