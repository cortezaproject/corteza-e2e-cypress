/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing preview output', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Testing preview output', () => {
    it('should be able to preview the output in HTML', () => {
      cy.visit(adminURL + '/')
      // We wait for 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Templates').click()
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="input-search"]').type('case_update_content')
      // We wait 1s for the search to finish
      cy.wait(1000)
      cy.contains('case_update_content').get('#resource-list > tbody > tr:last > td:last > a').click()
      cy.get('[data-test-id="button-preview-html-template"]').click()
      cy.url('exist', '/render/preview.html')
    })

    it('should be able to preview the output in PDF', () => {
      cy.get('[data-test-id="button-preview-pdf-template"]').click()
      cy.url('exist', '/render/preview.html')
    })
  })
})
