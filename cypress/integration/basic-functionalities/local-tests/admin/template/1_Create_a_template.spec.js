/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up
describe('Test for creating a template', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for creating a template without any data entered', () => {
    it('should not be able to create a template', () => {
      // This test might fail sometimes with an uncaught:error exception
      // so just try to rerun the test or increase the wait time below
      cy.wait(3000) // We wait for 3s in order the page to be fully loaded/rendered
      cy.get('.nav-sidebar').contains('Templates').click()
      cy.get('[data-test-id="button-new-template"]').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })
  })

  context('Test for checking if the new and delete buttons are not displayed when in create mode', () => {
    it('should not be displayed when creating a template', () => {
      cy.get('[data-test-id="button-new-template"]').should('not.exist')
      cy.get('[data-test-id="button-delete"]').should('not.exist')
    })
  })

  context('Test for checking template type and partial template', () => {
    it('template type should be HTML and partial template should exist', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="select-template-type"]').contains('HTML')
        cy.get('[data-test-id="checkbox-is-partial-template"]').should('exist')
      })
    })
  })

  context('Test for creating a template with missing handle', () => {
    it('should not be able to create a template', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').type('automated template')
        cy.get('[data-test-id="textarea-description"]').type('automated description')
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })
  })

  context('Test for creating a template with misconfigured handle', () => {
    it('should not be able to create a template', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-handle"]').type('H')
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })
  })

  context('Test for creating a template', () => {
    it('should be able to create a template', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-handle"]').clear().type('automated_template')
        cy.get('[data-test-id="button-submit"]').click()
        cy.get('[data-icon="check"]') // we checked if the submit button's content changed to a check icon
        cy.wait(2000) // We wait 2s in order the button to be switched from check to submit
        cy.get('[data-test-id="button-submit"]').should('exist')
      })
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
    })
  })

  context('Test for checking if the created template exists', () => {
    it('should exist', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').should('have.value', 'automated template')
        cy.get('[data-test-id="input-handle"]').should('have.value', 'automated_template')
        cy.get('[data-test-id="textarea-description"]').should('have.value', 'automated description')
      })
      cy.get('.nav-sidebar').contains('Templates').click()
      cy.get('[data-test-id="input-search"]').type('automated')
      cy.wait(2000) // We wait 2s in order the search to be completed
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-created-at"]').should('exist')
      })
    })
  })

  context('Test for creating a template with missing short name', () => {
    it('should be able to create a template with missing short name', () => {
      cy.get('.nav-sidebar').contains('Templates').click()
      cy.get('[data-test-id="button-new-template"]').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-handle"]').type('missing_short_name')
        cy.get('[data-test-id="textarea-description"]').type('description')
        cy.get('[data-test-id="button-submit"]').click()
        cy.get('[data-icon="check"]') // we checked if the submit button's content changed to a check icon
        cy.wait(2000) // We wait 2s in order the button to be switched from check to submit
        cy.get('[data-test-id="button-submit"]').should('exist')
      })
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
    })
  })
  
  context('Test for checking if the created template exists', () => {
    it('should exist', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').should('have.value', '')
        cy.get('[data-test-id="input-handle"]').should('have.value', 'missing_short_name')
        cy.get('[data-test-id="textarea-description"]').should('have.value', 'description')
      })
      cy.get('.nav-sidebar').contains('Templates').click()
      cy.get('[data-test-id="input-search"]').type('missing')
      cy.wait(2000) // We wait 2s in order the search to be completed
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-created-at"]').should('exist')
      })
    })
  })

  context('Test for creating a template with same name as another one', () => {
    it('should be able to create a template with identical name', () => {
      cy.get('.nav-sidebar').contains('Templates').click()
      cy.get('[data-test-id="button-new-template"]').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').type('automated template')
        cy.get('[data-test-id="input-handle"]').type('duplicate_template')
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
    })
  })

  context('Test for creating a template with same handle as previous one', () => {
    it('should not be able to create a template with identical handle', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').clear().type('automated template')
        cy.get('[data-test-id="input-handle"]').clear().type('automated_template')
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('.b-toast-danger') // We check if the danger toast appears
    })
  })
})
