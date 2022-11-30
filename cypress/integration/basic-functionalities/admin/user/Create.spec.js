/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a user', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for creating a user without any data entered or misconfigured field', () => {
    it('should not be able to create a user without any info entered', () => {
      // We wait for 3s in order the page to be fully loaded/rendered
      cy.wait(3000)
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
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })

    it('should not be able to create a user with misconfigured email', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').type('email')
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We check if the danger toast appears
      cy.get('.b-toast-danger')
    })

    it('should not be able to create a user with misconfigured handle', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').clear().type('email@test.com')
        cy.get('[data-test-id="input-handle"]').clear().type('H')
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
        // We check if the submit button's content changed to a check icon
        cy.get('[data-icon="check"]')
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should check if the user exists', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').should('have.value', 'automated@email.com')
        cy.get('[data-test-id="input-name"]').should('have.value', 'Automated account')
        cy.get('[data-test-id="input-handle"]').should('have.value', 'automated_account')
        cy.get('[data-test-id="input-created-at"]').should('exist')
      })
    })

    it('should also be able to create a user with missing handle', () => {
      cy.get('.nav-sidebar').contains('Users').click()
      // We wait for 1s in order the resource to be loaded
      cy.wait(1000)
      cy.get('[data-test-id="button-new-user"]').click()
      cy.get('[data-test-id="card-user-info"]').within(() => {
        // We wait for 1s in order the resource to be loaded
        cy.wait(1000)
        cy.get('[data-test-id="input-email"]').type('missing@email.com')
        cy.get('[data-test-id="input-name"]').type('missing account')
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should check if the user exists', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        // We wait for 1s in order the resource to be loaded
        cy.wait(1000)
        cy.get('[data-test-id="input-email"]').should('have.value', 'missing@email.com')
        cy.get('[data-test-id="input-name"]').should('have.value', 'missing account')
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
      // We check if the danger toast appears
      cy.get('.b-toast-danger')
    })

    it('should not be able to create a user with identical handle', () => {
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').clear().type('duplicate@email.com')
        cy.get('[data-test-id="input-handle"]').clear().type('automated_account')
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We check if the danger toast appears
      cy.get('.b-toast-danger')
    })
  })
})
