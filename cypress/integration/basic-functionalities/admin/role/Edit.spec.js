/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for editing a role', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for checking that delete, archive, and new buttons are displayed when in edit mode', () => {
    it('should be displayed when editing a role', () => {
      cy.intercept('/api/system/roles/?query=automated&deleted=0&archived=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('edited_role')
      cy.get('.nav-sidebar', { timeout: 10000 }).contains('Roles').click()
      cy.get('[data-test-id="input-search"]').type('automated')
      cy.wait('@edited_role')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click()
      cy.get('[data-test-id="button-new-role"]').should('exist')
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').should('exist')
        cy.get('[data-test-id="button-archive"]').should('exist')
      })
    })
  })

  context('Test for editing a role', () => {
    it('should be able to edit the role', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').clear().type('Edited automated role')
        cy.get('[data-test-id="input-handle"]').clear().type('edited_handle')
        cy.get('[data-test-id="textarea-description"]').type('Automated description')
        cy.get('[data-test-id="button-submit"]').click()
      })
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success') 
    })
  })

  context('Test for checking if the role got edited', () => {
    it('should be edited', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').should('have.value', 'Edited automated role')
        cy.get('[data-test-id="input-handle"]').should('have.value', 'edited_handle')
        cy.get('[data-test-id="textarea-description"]').should('have.value', 'Automated description')
        cy.get('[data-test-id="input-updated-at"]').should('exist')
      })
      cy.get('.nav-sidebar').contains('Roles').click()
      cy.get('[data-test-id="input-search"]').type('automated')
      cy.contains('Edited automated role').should('exist')
    })
  })

  context('Test for checking if you can create a role through edit mode', () => {
    it('should be able to create a role', () => {
      cy.intercept('/api/system/roles/?query=automated&deleted=0&archived=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('edit_role')
      cy.get('[data-test-id="input-search"]').clear().type('automated')
      cy.wait('@edit_role')
      cy.wait(1000)
      cy.contains('automated', { timeout: 10000 }).should('exist')
      cy.get('#resource-list > tbody > tr:last').should('exist').click()
      cy.get('[data-test-id="button-new-role"]').click()
      cy.url().should('contain', '/new')
    })
  })
})
