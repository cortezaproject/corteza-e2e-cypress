/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password
const newPassword = Cypress.env('user').newPassword

// When running this test make sure that the base url is set to localhost:3000
describe('Test for checking the change password functionality', () => {
  context('Test for changing the password of the user with misconfiguration or missing data', () => {
    it('should not be able to change the password of the user with no password entered', () => {
      cy.login({ email, password }) 
      // We check if the success toast appears
      cy.get('.border-primary')

      cy.get('[data-test-id="link-tab-security"]').click()
      cy.get('[data-test-id="link-change-password"]').click()
      cy.get('[data-test-id="button-change-password"]').click()
      cy.url().should('be.equal', baseURL + '/auth/change-password')
    })

    it('should not be able to change the password of the user with entering just the old password', () => {
      cy.login({ email, password })
      // We check if the success toast appears
      cy.get('.border-primary')

      cy.get('[data-test-id="link-tab-security"]').click()
      cy.get('[data-test-id="link-change-password"]').click()
      cy.get('[data-test-id="input-old-password"]').type(password)
      cy.get('[data-test-id="button-change-password"]').click()
      cy.url().should('be.equal', baseURL + '/auth/change-password')
    })

    it('should not be able to change the password of the user with entering just the new password', () => {
      cy.login({ email, password })
      // We check if the success toast appears
      cy.get('.border-primary')
      cy.get('[data-test-id="link-tab-security"]').click()
      cy.get('[data-test-id="link-change-password"]').click()
      cy.get('[data-test-id="input-old-password"]').clear()
      cy.get('[data-test-id="input-new-password"]').type(newPassword)
      cy.get('[data-test-id="button-change-password"]').click()
      cy.url().should('be.equal', baseURL + '/auth/change-password')
    })

    it('should not be able to change the password of the user with entering the same password on new and old password field', () => {
      cy.login({ email, password, buttonLoginID: 'button-login-and-remember' })

      cy.get('[data-test-id="link-tab-security"]').click()

      cy.get('[data-test-id="link-change-password"]').click()
      cy.get('[data-test-id="input-old-password"]').type(password)
      cy.get('[data-test-id="input-new-password"]').type(password)
      cy.get('[data-test-id="button-change-password"]').click()
      // We check if the error message pops up
      cy.get('.text-danger')
    })
  })

  context('Test for changing the password of the user', () => {
    it('should be able to change the password of the user', () => {
      cy.login({ email, password })
      // We check if the success toast appears
      cy.get('.border-primary')

      cy.get('[data-test-id="link-tab-security"]').click()
      cy.get('[data-test-id="link-change-password"]').click()
      cy.get('[data-test-id="input-old-password"]').type(password)
      cy.get('[data-test-id="input-new-password"]').type(newPassword)
      cy.get('[data-test-id="button-change-password"]').click()
      // We check if the success toast appears
      cy.get('.border-primary')
    })
  })
})
