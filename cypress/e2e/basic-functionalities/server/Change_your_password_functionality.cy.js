/// <reference types="cypress" />
const baseURL = Cypress.env('HOST')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

// When running this test make sure that the base url is set to localhost:3000
describe('Test for checking the change password functionality', () => {
  context('Test for changing the password of the user with misconfiguration or missing data', () => {
    it('should not be able to change the password of the user with no password entered', () => {
      cy.visit(baseURL + '/auth')
      cy.get('[data-test-id="link-tab-security"]').click({ force: true })
      cy.get('[data-test-id="link-change-password"]').click({ force: true })
      cy.get('[data-test-id="button-change-password"]').click({ force: true })
      cy.url().should('be.equal', baseURL + '/auth/change-password')
    })

    it('should not be able to change the password of the user with entering just the old password', () => {
      cy.get('[data-test-id="link-tab-security"]').click({ force: true })
      cy.get('[data-test-id="link-change-password"]').click({ force: true })
      cy.get('[data-test-id="input-old-password"]').type(password)
      cy.get('[data-test-id="button-change-password"]').click({ force: true })
      cy.url().should('be.equal', baseURL + '/auth/change-password')
    })

    it('should not be able to change the password of the user with entering just the new password', () => {
      cy.get('[data-test-id="link-tab-security"]').click()
      cy.get('[data-test-id="link-change-password"]').click({ force: true })
      cy.get('[data-test-id="input-old-password"]').clear({ force: true })
      cy.get('[data-test-id="input-new-password"]').type(newPassword)
      cy.get('[data-test-id="button-change-password"]').click({ force: true })
      cy.url().should('be.equal', baseURL + '/auth/change-password')
    })

    it('should not be able to change the password of the user with entering the same password on new and old password field', () => {
      cy.get('[data-test-id="link-tab-security"]').click({ force: true })
      cy.get('[data-test-id="link-change-password"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="input-old-password"]', { timeout: 10000 }).type(password)
      cy.get('[data-test-id="input-new-password"]').type(password)
      cy.get('[data-test-id="button-change-password"]').click({ force: true })
    })
  })

  context('Test for changing the password of the user', () => {
    it('should be able to change the password of the user', () => {
      cy.get('[data-test-id="link-tab-security"]').click({ force: true })
      cy.get('[data-test-id="link-change-password"]').click({ force: true })
      cy.get('[data-test-id="input-old-password"]').type(password)
      cy.get('[data-test-id="input-new-password"]').type(newPassword)
      cy.get('[data-test-id="button-change-password"]').click({ force: true })
      // We check if the success toast appears
      cy.get('.border-primary')
    })
  })
})
