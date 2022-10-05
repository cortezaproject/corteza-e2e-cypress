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
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Auth Clients').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:first > td > a').click()
      cy.get('[data-test-id="datepicker-choose-date"]:first').click()
      cy.get('.b-calendar-grid-body').contains('18').click({ force: true })
    })

    it('should be able to select a valid from time', () => {
      cy.get('[data-test-id="timepicker-choose-time"]:first').click()
      cy.get('.b-time-hours > .btn:first').click()
      cy.get('.b-time-minutes > .btn:first').click()
      cy.get('.b-form-time-control').contains('Close').click()
    })

    it('should be able to select a valid expires at date', () => {
      cy.get('[data-test-id="datepicker-choose-date"]:last').click()
      cy.get('.b-calendar-grid-body').contains('19').click({ force: true })
    })

    it('should be able to select a valid expires at time', () => {
      cy.get('[data-test-id="timepicker-choose-time"]:last').click()
      cy.get('.b-time-hours > .btn:first').click()
      cy.get('.b-time-minutes > .btn:first').click()
      cy.get('.b-form-time-control').contains('Close').click()
      cy.get('.card-footer > [data-test-id="button-submit"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
    })

    it('should have a date and time selected', () => {
      cy.get('[data-test-id="datepicker-choose-date"]:first').should('not.have.value', 'Choose a date')
      cy.get('[data-test-id="datepicker-choose-date"]:last').should('not.have.value', 'Choose a date')
      cy.get('[data-test-id="timepicker-choose-time"]:first').should('not.have.value', 'No time selected')
      cy.get('[data-test-id="timepicker-choose-time"]:last').should('not.have.value', 'No time selected')
    })

    it('should be able to reset the dates', () => {
      cy.get('[data-test-id="button-reset-value"]').click({ multiple: true })
      cy.get('.card-footer > [data-test-id="button-submit"]').click()
      // We confirm that the action was completed successfully
      cy.get('.b-toast-success')
      cy.get('[data-test-id="datepicker-choose-date"]:first').should('have.value', '')
      cy.get('[data-test-id="datepicker-choose-date"]:last').should('have.value', '')
      cy.get('[data-test-id="timepicker-choose-time"]:first').should('have.value', '')
      cy.get('[data-test-id="timepicker-choose-time"]:last').should('have.value', '')
    })
  })
})
