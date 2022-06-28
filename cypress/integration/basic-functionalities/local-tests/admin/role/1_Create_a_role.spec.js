/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up
describe('Test for creating a role', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for creating a role without any data entered', () => {
    it('should not be able to create a role', () => {
      // This test might fail sometimes with an uncaught:error exception
      // so just try to rerun the test or increase the wait time below
      cy.wait(3000) // We wait for 3s in order the page to be fully loaded/rendered
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="button-new-role"]').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })
  })

  context('Test for creating a role with missing role name', () => {
    it('should not be able to create a role', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-handle"]').type('Handle')
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })
  })

  context('Test for creating a role with missing handle', () => {
    it('should not be able to create a role', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('Name')
        cy.get('[data-test-id="input-handle"]').clear()
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })
  })

  context('Test for creating a role with misconfigured handle', () => {
    it('should not be able to create a role', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-handle"]').clear().type('H')
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })
  })

  context('Test for checking that delete, archive, and new buttons are not displayed when in create mode', () => {
    it('should not be displayed when creating a role', () => {
      cy.get('[data-test-id="button-new-role"]').should('not.exist')
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').should('not.exist')
        cy.get('[data-test-id="button-status"]').should('not.exist')
      })
    })
  })

  context('Test for creating a role', () => {
    it('should be able to create a role', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').clear().type('automated role')
        cy.get('[data-test-id="input-handle"]').clear().type('automated_role')
        cy.get('[data-test-id="button-submit"]').click()
        cy.get('[data-icon="check"]') // we checked if the submit button's content changed to a check icon
        cy.wait(2000) // We wait 2s in order the button to be switched from check to submit
        cy.get('[data-test-id="button-submit"]').should('exist')
      })
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
    })
  })

  context('Test for checking if the created role exists', () => {
    it('should exist', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').should('have.value', 'automated role')
        cy.get('[data-test-id="input-handle"]').should('have.value', 'automated_role')
      })
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="input-search"]').type('automated')
      cy.wait(2000) // We wait 2s in order the search to be completed
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-created-at"]').should('exist')
      })
    })
  })

  context('Test for creating a role with same name as another role', () => {
    it('should not be able to create a role with identical name', () => {
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="button-new-role"]').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('automated role')
        cy.get('[data-test-id="input-handle"]').type('duplicate_role')
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('.b-toast-danger') // We check if the danger toast appears
    })
  })

  context('Test for creating a role with same handle as previous role', () => {
    it('should not be able to create a role with identical handle', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').clear().type('Duplicate role')
        cy.get('[data-test-id="input-handle"]').clear().type('automated_role')
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('.b-toast-danger') // We check if the danger toast appears
    })
  })
})
