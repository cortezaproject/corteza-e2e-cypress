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
      cy.intercept('/api/system/application/?query=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('applications')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/application"]').click({ force: true })
      cy.wait('@applications')
      cy.get('[data-test-id="button-new-application"]').click()
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('Test un-delete application')
        cy.get('[data-test-id="checkbox-enabled"] input').check({ force: true })
        cy.get('[data-test-id="button-submit"]').click({ force: true })
      })
    })

    it('should be able to delete an application', () => {
      cy.intercept('/api/system/application/?query=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('applications')
      cy.intercept('/api/system/application/?query=Test+un-delete+application&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search-app')
      cy.get('.nav-sidebar').find('a[href="/system/application"]').click({ force: true })
      cy.wait('@applications')
      cy.get('[data-test-id="input-search"]').type('Test un-delete application')
      cy.wait('@search-app')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="button-delete"] button', { timeout: 10000 }).click({ force: true })
        cy.get('.confirmation-confirm', { timeout: 10000 }).click({ force: true })
      })
    })

    it('should be able to un-delete an application', () => {
      cy.intercept('/api/system/application/?query=Test+un-delete+application&deleted=2&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search-deleted-app')
      cy.get('[data-test-id="filter-deleted-apps"] input[value="2"]', { timeout: 10000 })
        .should('exist')
        .click({ force: true })
      cy.get('[data-test-id="input-search"]', { timeout: 10000 })
        .should('exist')
        .type('Test un-delete application')
      cy.wait('@search-deleted-app')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="card-application-info"]').within(() => {
        // Here we are also testing the created/updated/delete at part
        cy.get('[data-test-id="input-name"]').type(' ')
        cy.get('[data-test-id="button-submit"]').click()
        cy.get('[data-test-id="input-deleted-at"]').should('exist')
        cy.get('[data-test-id="input-created-at"]').should('exist')
        cy.get('[data-test-id="input-updated-at"]').should('exist')
        cy.get('[data-test-id="button-undelete"] button', { timeout: 10000 }).click({ force: true })
        cy.get('.confirmation-confirm', { timeout: 10000 }).click({ force: true })
        cy.get('[data-test-id="input-deleted-at"]').should('not.exist')
      })
    })

    it('should be able to logout', () => {
      cy.intercept('/api/system/application/?query=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('applications')
      cy.get('.nav-sidebar').find('a[href="/system/application"]').click({ force: true })
      cy.wait('@applications')
      cy.get('[data-test-id="input-search"]').type('Test un-delete application').should('exist')
      cy.get('[data-test-id="dropdown-profile"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="dropdown-profile-logout"]', { timeout: 10000 }).click({ force: true })
    })
  })
})
