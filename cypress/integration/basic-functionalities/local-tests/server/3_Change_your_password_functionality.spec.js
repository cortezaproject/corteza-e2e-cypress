/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password
const newPassword = Cypress.env('user').newPassword

// When running this test make sure that the base url is set to localhost:3000
describe('Test for checking the change password functionality', () => {
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

  context('Test for changing the password of the user with entering just the old password', () => {
    it('should not be able to change the password of the user', () => {
      cy.login({ email, password: newPassword })
      // We check if the success toast appears
      cy.get('.border-primary') 

      cy.get('[data-test-id="link-tab-security"]').click()
      cy.get('[data-test-id="link-change-password"]').click()
      cy.get('[data-test-id="input-old-password"]').type(newPassword)
      cy.get('[data-test-id="button-change-password"]').click()
      cy.url().should('be.equal', baseURL + '/auth/change-password')
    })
  })

  context('Test for changing the password of the user with entering just the new password', () => {
    it('should not be able to change the password of the user', () => {
      cy.login({ email, password: newPassword })
      // We check if the success toast appears
      cy.get('.border-primary') 

      cy.get('[data-test-id="link-tab-security"]').click()
      cy.get('[data-test-id="link-change-password"]').click()
      cy.get('[data-test-id="input-new-password"]').type(newPassword)
      cy.get('[data-test-id="button-change-password"]').click()
      cy.url().should('be.equal', baseURL + '/auth/change-password')
    })
  })

  // @todo once this is implemented
  // context('Test for changing the password of the user with entering the same password on new and old password field', () => {
  //   it('should not be able to change the password of the user', () => {
  //     cy.login({ email, password: newPassword, buttonLoginID: 'button-login-and-remember' })

  //     cy.get('[data-test-id="link-tab-security"]').click()
  //     cy.get('[data-test-id="link-change-password"]').click()
  //     cy.get('[data-test-id="input-old-password"]').type(newPassword)
  //     cy.get('[data-test-id="input-new-password"]').type(newPassword)
  //     cy.get('[data-test-id="button-change-password"]').click()
  //   })
  // })
})
