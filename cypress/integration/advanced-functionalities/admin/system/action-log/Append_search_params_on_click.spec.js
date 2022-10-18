/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for checking the click to search functionality', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for checking the click to search functionality', () => {
    it('should be able to populate the resource search if clicked on resource actions', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Action log').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="input-resource"]').should('have.value', '')
      // We click on the resource value from the results
      cy.get('#resource-list > tbody > tr:eq(0) > td > [data-test-id="item-resource"]').click()
      cy.get('[data-test-id="input-resource"]').should('not.have.value', '')
      // We store the resource value so we can compare it with resource input
      cy.get('#resource-list > tbody > tr:eq(0) > td > [data-test-id="item-resource"]').invoke('text').as('resource1')
      cy.get('@resource1').then(($r1) => {
        cy.get('[data-test-id="input-resource"]').should('have.value', $r1.trim())
      })
    })

    it('should be able to populate the action search if clicked on action results', () => {
      cy.get('[data-test-id="input-action"]').should('have.value', '')
      // We click on the action value from the results
      cy.get('#resource-list > tbody > tr:eq(0) > td > [data-test-id="item-action"]').click()
      cy.get('[data-test-id="input-action"]').should('not.have.value', '')
      // We store the action value so we can compare it with action input
      cy.get('#resource-list > tbody > tr:eq(0) > td > [data-test-id="item-action"]').invoke('text').as('action1')
      cy.get('@action1').then(($a1) => {
        cy.get('[data-test-id="input-action"]').should('have.value', $a1.trim())
      })
    })

    it('should be able to populate the User ID on search if clicked on user results', () => {
      cy.get('tbody > tr:eq(0) > td:eq(1)').click({ force: true })
      cy.get('[data-test-id="input-user-id"]').should('have.value', '')
      // We click on the user value from the results
      cy.get('#resource-list > tbody > tr:eq(0) > td > [data-test-id="item-user-id"]').click()
      cy.get('[data-test-id="input-user-id"]').should('not.have.value', '')
      // We store the user value so we can compare it with user input
      cy.get('tbody > tr:eq(1) > td > .card-group > .card > .card-body > div > [data-test-id="details-user-id"]').invoke('text').as('user1')
      cy.get('@user1').then(($u1) => {
        cy.get('[data-test-id="input-user-id"]').should('have.value', $u1.trim())
      })
    })
  })
})
