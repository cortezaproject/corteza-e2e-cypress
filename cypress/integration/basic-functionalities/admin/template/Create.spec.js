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

  context('Test for creating a template with misconfigured handle', () => {
    it('should not be able to create a template with misconfigured handle', () => {
      cy.get('.nav-sidebar', { timeout: 10000 }).contains('Templates').click()
      cy.get('[data-test-id="button-new-template"]').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').type('automated template')
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
        cy.get('[data-test-id="textarea-description"]').type('automated description')
        cy.get('[data-test-id="button-submit"]').click()
        // We check if the submit button's content changed to a check icon
        cy.get('[data-icon="check"]')
        cy.get('[data-test-id="button-submit"]', { timeout: 10000 }).should('exist')
      })
    })
  })

  context('Test for checking if the created template exists', () => {
    it('should exist', () => {
      cy.intercept('/api/system/template/?query=automated&handle=&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('template')
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').should('have.value', 'automated template')
        cy.get('[data-test-id="input-handle"]').should('have.value', 'automated_template')
        cy.get('[data-test-id="textarea-description"]').should('have.value', 'automated description')
      })
      cy.get('.nav-sidebar').contains('Templates').click()
      cy.get('[data-test-id="input-search"]').type('automated')
      cy.wait('@template')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-created-at"]').should('exist')
      })
    })
  })

  context('Test for creating a template with missing short name', () => {
    it('should not be able to create a template with missing short name', () => {
      cy.get('.nav-sidebar').contains('Templates').click()
      cy.get('[data-test-id="button-new-template"]').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-handle"]').type('missing_short_name')
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
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
        cy.get('[data-test-id="button-submit"]').click({ force: true })
      })
    })

    it('should not be able to create a template with identical handle', () => {
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').clear().type('automated template')
        cy.get('[data-test-id="input-handle"]').clear().type('automated_template')
        cy.get('[data-test-id="button-submit"]').click()
      })
    })
  })
})
