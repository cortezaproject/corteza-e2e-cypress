/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first run the Server test 2 in order to create a user so you can log in.
describe('Test webpage tour', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('This is a function for testing the webpage tour', () => {
    it('should be able to go through the webpage tour', () => {
      cy.get('.modal-footer > :last-child()').click() // We click on the start tour button
      Cypress._.times(5, () => {
        cy.get('[data-test-id="button-next"]').click() // With this function we click 5 times on the next button in order to go through the tour modals
      })
      cy.get('[data-test-id="button-stop-tour"]').click()
    })
  })
})
