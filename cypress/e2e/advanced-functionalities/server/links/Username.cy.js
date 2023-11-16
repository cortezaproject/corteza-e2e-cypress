/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')

describe('Testing username link', () => {
  context('Testing username link', () => {
    it('should be able to click on user name and be redirected to your profile tab', () => {
      cy.get('[data-test-id="link-redirect-to-profile"]').click()
      cy.url().should('exist', baseURL + '/auth/')
    })
  })
})
