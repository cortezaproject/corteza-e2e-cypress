/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for checking if you can select dates', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for checking if you can select dates', () => {
    it('should be able to select a valid from date', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/auth/clients/?deleted=0&limit=100&incTotal=true&sort=createdAt+DESC').as('auth-clients')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/authClient"]').click({ force: true })
      cy.wait('@auth-clients')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).contains('test_auth_client').click({ force: true })
      cy.get('[data-test-id="input-valid-from"] [data-test-id="picker-date"] button').click({ force: true })
      cy.get('.b-calendar-grid-body', { timeout: 10000 }).contains('18').click({ force: true })
    })

    it('should be able to select a valid from time', () => {
      cy.get('[data-test-id="input-valid-from"] [data-test-id="picker-time"] button').click({ force: true })
      cy.get('.b-time-hours > .btn:first').click({ force: true })
      cy.get('.b-time-minutes > .btn:first').click({ force: true })
    })

    it('should be able to select a valid expires at date', () => {
      cy.get('[data-test-id="input-expires-at"] [data-test-id="picker-date"] button').click({ force: true })
      cy.get('.b-calendar-grid-body').contains('19').click({ force: true })
    })

    it('should be able to select a valid expires at time', () => {
      cy.get('[data-test-id="input-expires-at"] [data-test-id="picker-time"] button').click({ force: true })
      cy.get('.b-time-hours > .btn:first').click({ force: true })
      cy.get('.b-time-minutes > .btn:first').click({ force: true })
      cy.get('.card-footer > [data-test-id="button-submit"]').click({ force: true })
    })

    it('should have a date and time selected', () => {
      cy.get('[data-test-id="input-valid-from"] [data-test-id="picker-date"]').should('not.have.value', 'Choose a date')
      cy.get('[data-test-id="input-expires-at"] [data-test-id="picker-date"]').should('not.have.value', 'Choose a date')
      cy.get('[data-test-id="input-valid-from"] [data-test-id="picker-time"]').should('not.have.value', 'No time selected')
      cy.get('[data-test-id="input-expires-at"] [data-test-id="picker-time"]').should('not.have.value', 'No time selected')
    })

    it('should be able to reset the dates', () => {
      cy.get('[data-test-id="input-valid-from"] [data-test-id="picker-date"] button').click({ force: true })
      
      cy.get('.b-calendar-footer').get('button[aria-label="Clear"]').click({ force: true })
      cy.get('[data-test-id="input-expires-at"] [data-test-id="picker-time"] button').click({ force: true })
      cy.get('.b-time-footer').get('button[aria-label="Clear"]').click({ force: true })
      cy.get('.card-footer > [data-test-id="button-submit"]').click({ force: true })
      cy.get('[data-test-id="input-valid-from"] [data-test-id="picker-date"]').should('have.value', '')
      cy.get('[data-test-id="input-expires-at"] [data-test-id="picker-date"]').should('have.value', '')
      cy.get('[data-test-id="input-valid-from"] [data-test-id="picker-time"]').should('have.value', '')
      cy.get('[data-test-id="input-expires-at"] [data-test-id="picker-time"]').should('have.value', '')
    })
  })
})
