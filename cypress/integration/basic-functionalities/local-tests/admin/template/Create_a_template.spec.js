/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a template', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for creating a template without any data entered or misconfigured field', () => {
    it('should not be able to create a template without any data entered', () => {
      // We wait for 3s in order the page to be fully loaded/rendered
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Templates').click()
      cy.get('[data-test-id="button-new-template"]').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })

    it('should not be able to create a template with missing handle', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').type('automated template')
        cy.get('[data-test-id="textarea-description"]').type('automated description')
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })

    it('should not be able to create a template with misconfigured handle', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-handle"]').type('H')
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

  context('Test for creating a template', () => {
    it('should be able to create a template', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-handle"]').clear().type('automated_template')
        cy.get('[data-test-id="button-submit"]').click()
        // We check if the submit button's content changed to a check icon
        cy.get('[data-icon="check"]')
        // We wait 1s in order the button to be switched from check to submit
        cy.wait(1000)
        cy.get('[data-test-id="button-submit"]').should('exist')
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
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
      // We wait 2s in order the search to be completed
      cy.wait(2000)
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
        cy.get('[data-test-id="button-submit"]').click()
        // We check if the submit button's content changed to a check icon
        cy.get('[data-icon="check"]')
        // We wait 2s in order the button to be switched from check to submit
        cy.wait(2000)
        cy.get('[data-test-id="button-submit"]').should('exist')
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })
  })

  context('Test for checking if the created template exists', () => {
    it('should exist', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-handle"]').should('have.value', 'missing_short_name')
      })
      cy.get('.nav-sidebar').contains('Templates').click()
      cy.get('[data-test-id="input-search"]').type('missing')
      // We wait 2s in order the search to be completed
      cy.wait(2000)
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-created-at"]').should('exist')
      })
    })
  })

  context('Test for creating a template with same name and handle as another one', () => {
    it('should be able to create a template with identical name', () => {
      cy.get('.nav-sidebar').contains('Templates').click()
      cy.get('[data-test-id="button-new-template"]').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').type('automated template')
        cy.get('[data-test-id="input-handle"]').type('duplicate_template')
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should not be able to create a template with identical handle', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').clear().type('automated template')
        cy.get('[data-test-id="input-handle"]').clear().type('automated_template')
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We check if the danger toast appears
      cy.get('.b-toast-danger')
    })
  })
})
