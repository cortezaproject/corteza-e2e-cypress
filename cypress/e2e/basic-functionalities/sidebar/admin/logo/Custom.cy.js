/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing the sidebar custom logo', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Testing the sidebar custom logo', () => {
    it('should be able to set a default logo', () => {
      // We access the admin user interface settings
      cy.visit(adminURL + '/')
      cy.get('[data-test-id="sidebar"]', { timeout: 10000 }).find('a[href="/ui"]').click()
      cy.get('[data-test-id="drop-area"]:eq()')
          .get('input[type="file"]:eq()')
          .selectFile('cypress/fixtures/images/yin_yang.png', { force: true })
      cy.get('[data-test-id="button-submit"]:last').click()
      cy.get('[data-test-id="img-main-logo"]', { timeout: 10000 }).should('have.attr', 'src').should('include', 'attachment')
    })
  })
})
