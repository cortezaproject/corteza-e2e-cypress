/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up
describe('Test for creating a user', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for creating a user without any data entered or misconfigured field', () => {
    it('should not be able to create a user', () => {
      // This test might fail sometimes with an uncaught:error exception
      // so just try to rerun the test or increase the wait time below
      cy.wait(3000) // We wait for 3s in order the page to be fully loaded/rendered
      cy.get('.nav-sidebar').contains('Users').click()
      cy.get('[data-test-id="button-new-user"]').click()
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })

    it('should not be able to create a user with missing email', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('Name')
        cy.get('[data-test-id="input-handle"]').type('Handle')
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('.b-toast-danger') // We check if the danger toast appears
    })

    it('should not be able to create a user with misconfigured email', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').type('email')
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('.b-toast-danger') // We check if the danger toast appears
    })

    it('should not be able to create a user with misconfigured handle', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').clear().type('email@test.com')
        cy.get('[data-test-id="input-handle"]').clear().type('H')
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })

    it('should not be able to create a user with missing handle', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-handle"]').clear()
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })

    it('should not be able to create a user with only a name entered', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').clear()
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })
  })

  context('Test for checking that delete, suspend, revoke and new buttons are not displayed when in create mode', () => {
    it('should not be displayed when creating a user', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="button-new-user"]').should('not.exist')
        cy.get('[data-test-id="button-delete"]').should('not.exist')
        cy.get('[data-test-id="button-status"]').should('not.exist')
        cy.get('[data-test-id="button-sessions-revoke"]').should('not.exist')
      })
    })
  })

  context('Test for creating a user', () => {
    it('should be able to create a user', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').clear().type('automated@email.com')
        cy.get('[data-test-id="input-name"]').clear().type('Automated account')
        cy.get('[data-test-id="input-handle"]').clear().type('automated_account')
        cy.get('[data-test-id="button-submit"]').click()
        cy.get('[data-icon="check"]') // we checked if the submit button's content changed to a check icon
      })
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
    })
  })

  context('Test for checking if the created user exists', () => {
    it('should exist', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').should('have.value', 'automated@email.com')
        cy.get('[data-test-id="input-name"]').should('have.value', 'Automated account')
        cy.get('[data-test-id="input-handle"]').should('have.value', 'automated_account')
      })
      cy.get('.nav-sidebar').contains('Users').click()
      cy.contains('Automated account').should('exist')
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-created-at"]').should('exist')
      })
    })
  })

  context('Test for creating a user with same email and handle as previous user', () => {
    it('should not be able to create a user with identical email', () => {
      cy.get('.nav-sidebar').contains('Users').click()
      cy.get('[data-test-id="button-new-user"]').click()
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').type('automated@email.com')
        cy.get('[data-test-id="input-name"]').type('Duplicate account')
        cy.get('[data-test-id="input-handle"]').type('duplicate_account')
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('.b-toast-danger') // We check if the danger toast appears
    })

    it('should not be able to create a user with identical handle', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').clear().type('duplicate@email.com')
        cy.get('[data-test-id="input-handle"]').clear().type('automated_account')
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('.b-toast-danger') // We check if the danger toast appears
    })
  })
})
