/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for evaluating admin automation permissions', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for evaluating admin automation permissions', () => {
    it('should be able to add a role for evaluation', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      // We click on automation permissions
      cy.get('[data-test-id="sidebar"]').find('a[href="/automation/permissions"]').click()
      cy.wait(1000)
      cy.get('[data-test-id="button-add-role"]').click()
      cy.get('[data-test-id="select-edit-roles"]').type('Security administrator{enter}')
      cy.contains('Save & Close').click({ force: true })
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
    })

    it('should be able to restrict the permission to grant permissions on automation component', () => {
      cy.get('[data-test-id="permission-grant"] > .active-cell').click()
      cy.get('.card-footer > [data-test-id="button-submit"]').click({ force: true })
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })
  })
})
