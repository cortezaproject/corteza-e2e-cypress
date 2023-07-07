/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const superAdminEmail = Cypress.env('USER_EMAIL')
const superAdminPassword = Cypress.env('USER_PASSWORD')
const dpoEmail = Cypress.env('USER_DPO')
const dpoPassword = Cypress.env('USER_DPO_PASSWORD')

describe('Test for adding a DPO user', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email: superAdminEmail, password: superAdminPassword, url: adminURL })
    }
  })

  context('Test for setting up user data', () => {
    it('should be able add new user', () => {
      cy.visit(adminURL)
      cy.get('.nav-sidebar', { timeout: 10000 }).contains('Users').click()
      cy.get('[data-test-id="button-new-user"]').click()
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').clear().type(dpoEmail)
        cy.get('[data-test-id="input-name"]').clear().type('DPO')
        cy.get('[data-test-id="input-handle"]').clear().type('dpo')
        cy.get('[data-test-id="button-submit"]').click()
        // We check if the submit button's content changed to a check icon
        cy.get('[data-icon="check"]')
      })
    })

    it('should set role to DPO', () => {
      cy.get('[data-test-id="card-role-membership"]').within(() => {
        cy.get('[data-test-id="role-picker"]').click()
        cy.contains('Data Privacy Officer').click()
        cy.get('[data-test-id="button-submit"]').click()
      })
    })

    it('should be able to add password', () => {
      cy.get('[data-test-id="card-user-password"]').within(() => {
        cy.get('[data-test-id="input-new-password"]').type(dpoPassword, { force: true })
        cy.get('[data-test-id="input-confirm-password"]').type(dpoPassword, { force: true })
        cy.get('[data-test-id="button-submit"]').click({ force: true }).get('svg .fa-check').should('not.exist')
      })
    })
  })
})
