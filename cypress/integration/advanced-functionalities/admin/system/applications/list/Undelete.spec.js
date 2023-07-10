/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for un-deleting admin application', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for un-deleting admin application', () => {
    it('should be able to create an application', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/application/?query=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('applications')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.wait('@applications')
      cy.get('[data-test-id="button-new-application"]').click()
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('Test un-delete application')
        cy.get('[data-test-id="checkbox-enabled"]').check({ force: true })
        cy.get('[data-test-id="button-submit"]').click()
      })
    })

    it('should be able to un-delete an app', () => {
      cy.intercept('/api/system/application/?query=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('applications')
      cy.intercept('/api/system/application/?query=Test+un-delete+application&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('search-deleted-app')
      cy.intercept('/api/system/application/?query=Test+un-delete+application&deleted=2&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('search-undeleted-app')
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.wait('@applications')
      cy.get('[data-test-id="input-search"]').type('Test un-delete application')
      cy.wait('@search-deleted-app')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.btn-danger').click()
      })
      cy.get('.nav-sidebar').contains('Applications').click()
      cy.wait('@applications')
      cy.get('[data-test-id="filter-deleted-apps"]').contains('Only').click()
      cy.get('[data-test-id="input-search"]').type('Test un-delete application')
      cy.wait('@search-undeleted-app')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="card-application-info"]').within(() => {
        // Here we are also testing the created/updated/delete at part
        cy.get('[data-test-id="input-name"]').type(' ')
        cy.get('[data-test-id="button-submit"]').click()
        cy.get('[data-test-id="input-deleted-at"]').should('exist')
        cy.get('[data-test-id="input-created-at"]').should('exist')
        cy.get('[data-test-id="input-updated-at"]').should('exist')
        cy.get('[data-test-id="button-undelete"]').click()
        cy.get('.btn-danger').click()
        cy.get('[data-test-id="input-deleted-at"]').should('not.exist')
      })

      cy.get('.nav-sidebar').contains('Applications').click()
      cy.wait('@applications')
      cy.get('[data-test-id="input-search"]').type('Test un-delete application').should('exist')
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
    })
  })
})
