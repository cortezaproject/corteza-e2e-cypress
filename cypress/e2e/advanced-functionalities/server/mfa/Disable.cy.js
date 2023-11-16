/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for disabling multi-factor authentication', () => {
  context('Test for disabling multi-factor authentication', () => {
    it('should be able to login', () => {
      cy.login({ email, password, url: adminURL })
    })

    it('should be able to disable multi-factor authentication', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/settings/').as('auth-settings')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/settings"]').click({ force: true })
      cy.wait('@auth-settings')
      cy.get('[data-test-id="checkbox-enable-emailOTP"] input').uncheck({ force: true })
      cy.get('[data-test-id="checkbox-enable-TOTP"] input').uncheck({ force: true })
      cy.get('[data-test-id="card-edit-authentication"] [data-test-id="button-submit"]')
        .click({ force: true })
      cy.get('[data-test-id="checkbox-enable-emailOTP"]').should('not.be.checked')
      cy.get('[data-test-id="checkbox-enable-TOTP"]').should('not.be.checked')
    })
  })
})
