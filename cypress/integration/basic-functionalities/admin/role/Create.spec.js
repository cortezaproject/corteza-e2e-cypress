/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a role', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for creating a role without any data entered or misconfigured field', () => {
    it('should not be able to create a role without any data entered', () => {
      // We wait for 3s in order the page to be fully loaded/rendered
      cy.wait(3000) 
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="button-new-role"]').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })

    it('should not be able to create a role with missing role name', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-handle"]').type('Handle')
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })

    it('should not be able to create a role with missing handle', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('Name')
        cy.get('[data-test-id="input-handle"]').clear()
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We see that an error pops up saying handle field is empty
      cy.get('.b-toast-danger')
    })

    it('should not be able to create a role with misconfigured handle', () => {
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
        // We check if the submit button's content changed to a check icon
        cy.get('[data-icon="check"]') 
        cy.get('[data-test-id="button-submit"]').should('exist')
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
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
      // We wait 1s in order the search to be completed
      cy.wait(1000) 
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-created-at"]').should('exist')
      })
    })
  })

  context('Test for creating a role with same name and handle as another role', () => {
    it('should not be able to create a role with identical name', () => {
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="button-new-role"]').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('automated role')
        cy.get('[data-test-id="input-handle"]').type('duplicate_role')
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We check if the danger toast appears
      cy.get('.b-toast-danger') 
    })
    
    it('should not be able to create a role with identical handle', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').clear().type('Duplicate role')
        cy.get('[data-test-id="input-handle"]').clear().type('automated_role')
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We check if the danger toast appears
      cy.get('.b-toast-danger') 
    })
  })
})