/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for evaluating admin compose permissions', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    } else {
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for evaluating admin compose permissions', () => {
    it('should be able to restrict the permission to grant permissions on compose component', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/compose/permissions/').as('permissions')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('[data-test-id="sidebar"]').find('a[href="/compose/permissions"]').click({ force: true })
      cy.wait('@permissions')
      cy.get('[data-test-id="permission-grant"] > .active-cell').click()
      cy.get('.card-footer > [data-test-id="button-submit"]').click({ force: true })
    })
  })
})
