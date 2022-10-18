/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for action log search functionalities', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for action log search functionalities', () => {
    it('should be able to select starting from date', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Action log').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="filter-starting-from"]').within(() => {
        cy.get('.b-form-datepicker').click()
        cy.get('.b-calendar-grid-body').contains('1').click({ force: true })
      })
    })

    it('should be able to select starting from time', () => {
      cy.get('[data-test-id="filter-starting-from"]').within(() => {
        cy.get('.b-form-timepicker').click()
        cy.contains('Now').click({ force: true })
      })
    })

    it('should be able to select ending at date', () => {
      cy.get('[data-test-id="filter-ending-at"]').within(() => {
        cy.get('.b-form-datepicker').click()
        cy.contains('Today').click({ force: true })
      })
    })

    it('should be able to select ending at time', () => {
      cy.get('[data-test-id="filter-ending-at"]').within(() => {
        cy.get('.b-form-timepicker').click()
        cy.contains('Now').click({ force: true })
      })
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
      cy.get('[data-test-id="input-user-id"]').type('Cypress test account')
      cy.get('[data-test-id="button-submit"]').click()
    })

    it('should be able to add search criteria and check the results', () => {
      cy.get('[data-test-id="filter-starting-from"]').within(() => {
        cy.get('.b-form-datepicker').click()
        cy.get('.b-calendar-grid-body').contains('1').click({ force: true })
      })
      cy.get('[data-test-id="filter-starting-from"]').within(() => {
        cy.get('.b-form-timepicker').click()
        cy.contains('Now').click({ force: true })
      })
      cy.get('[data-test-id="filter-ending-at"]').within(() => {
        cy.get('.b-form-datepicker').click()
        cy.contains('Today').click({ force: true })
      })
      cy.get('[data-test-id="filter-ending-at"]').within(() => {
        cy.get('.b-form-timepicker').click()
        cy.contains('Now').click({ force: true })
      })
      cy.get('[data-test-id="input-resource"]').clear().type('system:auth')
      cy.get('[data-test-id="input-action"]').clear().type('authenticate')
      cy.get('[data-test-id="input-user-id"]').clear()
      cy.get('[data-test-id="button-submit"]').click()
      cy.get('#resource-list > tbody > tr:first').should('exist', 'system:auth', 'authenticate', 'Cypress test account', 'auth', 'successfully authenticated with password')
    })
  })
})
