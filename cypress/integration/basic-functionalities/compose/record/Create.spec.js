/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a record', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test for creating a record through the all records button', () => {
    it('should be able to create a record ', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]').click({ force: true })
      cy.get('[data-test-id="button-admin"]', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-all-records"]', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-add-record"]').click()
      cy.get('input:nth-child(1)', { timeout: 10000 }).eq(1).type('28')
      cy.get('input:nth-child(1)').eq(2).type('John')
      cy.get('input:nth-child(1)').eq(3).type('Doe')
      cy.get('[data-test-id="button-save"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.card-body', { timeout: 10000 }).contains('28', { timeout: 10000 }).should('exist')
      cy.get('.card-body').contains('John').should('exist')
      cy.get('.card-body').contains('Doe').should('exist')
      cy.url().should('contain', '/record')
    })
  })

  context('Test for creating a record through the module all records button', () => {
    it('should be able to create a record ', () => {
      cy.get('.nav-sidebar').contains('Modules').click()
      cy.get('.header-navigation').contains('All records').click()
      cy.get('[data-test-id="button-add-record"]').click()
      cy.get('input:nth-child(1)').eq(1).type('26')
      cy.get('input:nth-child(1)').eq(2).type('Dave')
      cy.get('input:nth-child(1)').eq(3).type('Smith')
      cy.get('[data-test-id="button-save"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.card-body', { timeout: 10000 }).contains('26').should('exist')
      cy.get('.card-body').contains('Dave').should('exist')
      cy.get('.card-body').contains('Smith').should('exist')
      cy.url().should('contain', '/record')
    })
  })

  context('Test for creating a record through the public page', () => {
    it('should be able to create a record ', () => {
      cy.get('[data-test-id="button-public"]').click()
      cy.get('[data-test-id="button-add-record"]', { timeout: 10000 }).click()
      cy.get('input:nth-child(1)').eq(1).type('23')
      cy.get('input:nth-child(1)').eq(2).type('Eddie')
      cy.get('input:nth-child(1)').eq(3).type('Turner')
      cy.get('[data-test-id="button-save"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.card-body', { timeout: 10000 }).contains('23').should('exist')
      cy.get('.card-body').contains('Eddie').should('exist')
      cy.get('.card-body').contains('Turner').should('exist')
      cy.url().should('contain', '/record')
    })
  })

  context('Test for creating a new record while in record view', () => {
    it('should be able to create a record ', () => {
      cy.get('[data-test-id="button-add-new"]').click()
      cy.get('input:nth-child(1)').eq(1).type('30')
      cy.get('input:nth-child(1)').eq(2).type('Mark')
      cy.get('input:nth-child(1)').eq(3).type('Fritz')
      cy.get('[data-test-id="button-save"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.card-body', { timeout: 10000 }).contains('30').should('exist')
      cy.get('.card-body').contains('Mark').should('exist')
      cy.get('.card-body').contains('Fritz').should('exist')
      cy.url().should('contain', '/record')
    })
  })

  context('Test for checking if back, delete, clone, edit and add new buttons are displayed in record view', () => {
    it('should be displayed when in record view ', () => {
      cy.get('[data-test-id="button-back"]').should('exist')
      cy.get('[data-test-id="button-delete"]').should('exist')
      cy.get('[data-test-id="button-clone"]').should('exist')
      cy.get('[data-test-id="button-edit"]').should('exist')
      cy.get('[data-test-id="button-add-new"]').should('exist')
    })
  })

  context('Test for checking the back button functionality in record view', () => {
    it('should be able to go back', () => {
      cy.contains('Cypress page').click()
      cy.get('tbody > tr:first', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-back"]').click()
      cy.url().should('not.contain', '/record')
    })
  })

  context('Test for checking if delete, clone, edit and add new buttons are not displayed in add a new record view', () => {
    it('should not be displayed when in add a new record view ', () => {
      cy.get('[data-test-id="button-add-record"]').click()
      cy.get('[data-test-id="button-back"]').should('exist')
      cy.get('[data-test-id="button-delete"]').should('not.exist')
      cy.get('[data-test-id="button-clone"]').should('not.exist')
      cy.get('[data-test-id="button-edit"]').should('not.exist')
      cy.get('[data-test-id="button-add-new"]').should('not.exist')
    })
  })

  context('Adding couple more records for the need of delete tests', () => {
    // This test has been added so we can cover all of the delete a record cases for the needs of the delete tests
    it('should add couple more records', () => {
      cy.get('input:nth-child(1)').eq(1).type('37')
      cy.get('input:nth-child(1)').eq(2).type('Peter')
      cy.get('input:nth-child(1)').eq(3).type('Heinz')
      cy.get('[data-test-id="button-save"]').click()
      cy.url().should('contain', '/record')
      cy.get('[data-test-id="button-clone"]').click()
      cy.get('input:nth-child(1)').eq(1).clear().type('26')
      cy.get('input:nth-child(1)').eq(2).clear().type('Chris')
      cy.get('input:nth-child(1)').eq(3).clear().type('Pop')
      cy.get('[data-test-id="button-save"]').click()
      cy.url().should('contain', '/record')
      cy.get('[data-test-id="button-clone"]').click()
      cy.get('input:nth-child(1)').eq(1).clear().type('30')
      cy.get('input:nth-child(1)').eq(2).clear().type('Mark')
      cy.get('input:nth-child(1)').eq(3).clear().type('Goldwing')
      cy.get('[data-test-id="button-save"]').click()
      cy.url().should('contain', '/record')
    })
  })
})
