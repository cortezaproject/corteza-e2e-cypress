/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')

describe('Testing Corteza logo', () => {
  context('Testing Corteza logo', () => {
    it('should be able to click on Corteza logo and be redirected to log in screen', () => {
      cy.get('[data-test-id="img-corteza-logo"]').click({ force: true })
      cy.url().should('exist', baseURL + '/auth/')
    })
  })
})
