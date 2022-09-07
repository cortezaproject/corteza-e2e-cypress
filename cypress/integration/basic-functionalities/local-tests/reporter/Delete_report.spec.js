/// <reference types="cypress" />
const reporterURL = Cypress.env('REPORTER_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for deleting a report', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: reporterURL })
    }
  })

  context('Test for deleting a report', () => {
    it('should be able to delete a report successfully', () => {
      // We click on the Edit button on the created report
      cy.get('table > tbody > :first-child() > :last-child() > a:nth-child(2)').click() 
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success') 
      cy.contains('cypress_handle').should('not.exist')

      // We click on the Edit button on the created report
      cy.get('table > tbody > :first-child() > :last-child() > a:nth-child(2)').click() 
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success') 
      cy.contains('another_cypress_report').should('not.exist')
    })
  })
})
