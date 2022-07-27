/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for deleting a report', () => {
  before(() => {
    cy.login({ email, password })
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
    })
  })
})
