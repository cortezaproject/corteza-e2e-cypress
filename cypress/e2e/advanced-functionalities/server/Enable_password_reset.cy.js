/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')

describe('Testing enabling password reset', () => {
  context('Testing enabling password reset in admin', () => {
    it('should be able to enable the setting', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/settings/').as('auth-settings')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/settings"]').click({ force: true })
      cy.wait('@auth-settings')
      cy.get('[data-test-id="checkbox-password-reset"] input').check({ force: true })
      cy.get('[data-test-id="card-edit-authentication"] [data-test-id="button-submit"]')
        .click({ force: true })
      cy.get('[data-test-id="dropdown-profile"]').click({ force: true })
      cy.get('[data-test-id="dropdown-profile-logout"]').click({ force: true })
      cy.clearAllSessionStorage()
    })
  })
})
