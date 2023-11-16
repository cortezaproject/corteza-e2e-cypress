/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for action log search functionalities', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    } else {
      cy.get('[data-test-id="dropdown-profile"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="dropdown-profile-logout"]', { timeout: 10000 }).click({ force: true })
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for action log search functionalities', () => {
    it('should be able to select starting from date', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/actionlog/?limit=10').as('action-log')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/actionlog"]').click({ force: true })
      cy.wait('@action-log')
      cy.get('[data-test-id="filter-starting-from"] [data-test-id="picker-date"] button', { timeout: 10000 })
        .click({ force: true })
      cy.get('.b-calendar-grid-body', { timeout: 10000 }).contains('1').click({ force: true })
    })

    it('should be able to select starting from time', () => {
      cy.get('[data-test-id="filter-starting-from"] [data-test-id="picker-time"] button', { timeout: 10000 })
        .click({ force: true })
      cy.get('button[aria-label="Now"]', { timeout: 10000 }).click({ force: true })
    })

    it('should be able to select ending at date', () => {
      cy.get('[data-test-id="filter-ending-at"] [data-test-id="picker-date"] button', { timeout: 10000 })
        .click({ force: true })
      cy.get('button[aria-label="Today"]', { timeout: 10000 }).click({ force: true })
    })

    it('should be able to select ending at time', () => {
      cy.get('[data-test-id="filter-ending-at"] [data-test-id="picker-time"] button', { timeout: 10000 })
        .click({ force: true })
        cy.get('button[aria-label="Now"]', { timeout: 10000 }).click({ force: true })
    })

    it('should have a date and time selected', () => {
      cy.get('[data-test-id="filter-starting-from"]').should('not.have.value', 'None')
      cy.get('[data-test-id="filter-ending-at"]').should('not.have.value', 'None')
    })

    it('should be able to add a resource', () => {
      cy.get('[data-test-id="input-resource"]').type('system:auth')
    })

    it('should be able to add an action', () => {
      cy.get('[data-test-id="input-action"]').type('authenticate')
    })

    it('should be able to add a user ID', () => {
      cy.get('[data-test-id="button-submit"]').click()
    })

    it('should be able to add search criteria and check the results', () => {
      cy.get('[data-test-id="filter-starting-from"] [data-test-id="picker-date"] button')
        .click({ force: true })
      cy.get('.b-calendar-grid-body').contains('1').click({ force: true })

      cy.get('[data-test-id="filter-starting-from"] [data-test-id="picker-time"] button')
        .click({ force: true })
      cy.get('button[aria-label="Now"]', { timeout: 10000 }).click({ force: true })
  
      cy.get('[data-test-id="filter-ending-at"] [data-test-id="picker-date"] button')
        .click({ force: true })
      cy.get('button[aria-label="Today"]', { timeout: 10000 }).click({ force: true })

      cy.get('[data-test-id="filter-ending-at"] [data-test-id="picker-time"] button')
        .click({ force: true })
      cy.get('button[aria-label="Now"]', { timeout: 10000 }).click({ force: true })

      cy.get('[data-test-id="input-resource"]').clear().type('system:auth')
      cy.get('[data-test-id="input-action"]').clear().type('authenticate')
      cy.get('[data-test-id="input-user-id"]').clear()
      cy.get('[data-test-id="button-submit"]').click()
      cy.get('#resource-list > tbody > tr:first')
        .should('exist',
          'system:auth',
          'authenticate',
          'Cypress test account',
          'auth',
          'successfully authenticated with password'
        )
    })
  })
})
