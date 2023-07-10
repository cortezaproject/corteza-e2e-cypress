/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for adding a logo on application', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for adding a logo on application', () => {
    it('should be able to add a logo', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/application/?query=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('applications')
      cy.intercept('api/system/application/?query=Testing+application&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('search')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.wait('@applications')
      cy.get('[data-test-id="input-search"]').type('Testing application')
      cy.wait('@search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="card-application-selector"]').within(() => {
        cy.get('[data-test-id="file-logo-upload"]').selectFile('cypress/fixtures/images/yin_yang.png', { force: true })
        cy.get('[data-test-id="button-submit"]').click({ force: true }).contains('Submit')
      })
      cy.get('[data-test-id="file-logo-upload"]').should('exist', 'yin_yang.png')
      cy.get('[data-test-id="button-logo-show"]').click()
      cy.get('[data-test-id="img-logo-preview"]').should('exist')
    })
  })
})
