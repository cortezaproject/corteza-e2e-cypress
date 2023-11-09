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
    it('should be able to delete all of the reports successfully', () => {
      // We click on the report
      cy.wait(1000)
      cy.get('#resource-list > tbody > :first-child()').click()
      cy.get('.tools-wrapper > div > div > a:nth-child(2)', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()

      cy.wait(1000)
      // We click on the report
      cy.get('#resource-list > tbody > :first-child()').click()
      cy.get('.tools-wrapper > div > div > a:nth-child(2)').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()

      cy.wait(1000)
      // We click on the Edit button on the created report
      cy.get('#resource-list > tbody > :first-child()').click()
      cy.get('.tools-wrapper > div > div > a:nth-child(2)').click()
      cy.get('[data-test-id="button-delete"]').click()
      cy.get('[data-test-id="button-delete-confirm"]').click()

      cy.get('[data-test-id="no-matches"]').should('exist')
    })
  })
})
