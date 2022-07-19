/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up, create a namespace, module, and a record page (also edit it)
describe('Test for creating a record', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for creating a record through the all records button', () => {
    it('should be able to create a record ', () => {
      cy.get('[data-test-id="button-visit-namespace"]:last').click()
      cy.get('[data-test-id="button-admin"]').click()
      cy.get('[data-test-id="button-all-records"]').click()
      cy.get('[data-test-id="button-add-record"]').click()
      cy.get('input:nth-child(1)').eq(0).type('28')
      cy.get('input:nth-child(1)').eq(1).type('John')
      cy.get('input:nth-child(1)').eq(2).type('Doe')
      cy.get('[data-test-id="button-submit"]').click()
      cy.wait(500)
      cy.get('.card-body').contains('28').should('exist')
      cy.get('.card-body').contains('John').should('exist')
      cy.get('.card-body').contains('Doe').should('exist')
      cy.url().should('contain', '/record/')
    })
  })

  context('Test for creating a record through the module all records button', () => {
    it('should be able to create a record ', () => {
      cy.get('.nav-sidebar').contains('Modules').click()
      cy.get('.header-navigation').contains('All records').click()
      cy.get('[data-test-id="button-add-record"]').click()
      cy.get('input:nth-child(1)').eq(0).type('26')
      cy.get('input:nth-child(1)').eq(1).type('Dave')
      cy.get('input:nth-child(1)').eq(2).type('Smith')
      cy.get('[data-test-id="button-submit"]').click()
      cy.wait(500)
      cy.get('.card-body').contains('26').should('exist')
      cy.get('.card-body').contains('Dave').should('exist')
      cy.get('.card-body').contains('Smith').should('exist')
      cy.url().should('contain', '/record/')
    })
  })

  context('Test for creating a record through the public page', () => {
    it('should be able to create a record ', () => {
      cy.get('[data-test-id="button-public"]').click()
      cy.get('[data-test-id="button-add-record"]').click()
      cy.get('input:nth-child(1)').eq(0).type('23')
      cy.get('input:nth-child(1)').eq(1).type('Eddie')
      cy.get('input:nth-child(1)').eq(2).type('Turner')
      cy.get('[data-test-id="button-submit"]').click()
      cy.wait(500)
      cy.get('.card-body').contains('23').should('exist')
      cy.get('.card-body').contains('Eddie').should('exist')
      cy.get('.card-body').contains('Turner').should('exist')
      cy.url().should('contain', '/record/')
    })
  })

  context('Test for creating a new record while in record view', () => {
    it('should be able to create a record ', () => {
      cy.get('[data-test-id="button-add-new"]').click()
      cy.get('input:nth-child(1)').eq(0).type('30')
      cy.get('input:nth-child(1)').eq(1).type('Mark')
      cy.get('input:nth-child(1)').eq(2).type('Fritz')
      cy.get('[data-test-id="button-submit"]').click()
      cy.wait(500)
      cy.get('.card-body').contains('30').should('exist')
      cy.get('.card-body').contains('Mark').should('exist')
      cy.get('.card-body').contains('Fritz').should('exist')
      cy.url().should('contain', '/record/')
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
      cy.get('[data-test-id="button-back"]').click()
    })
  })

  context('Test for checking if delete, clone, edit and add new buttons are not displayed in add a new record view', () => {
    it('should not be displayed when in add a new record view ', () => {
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
      cy.get('input:nth-child(1)').eq(0).type('37')
      cy.get('input:nth-child(1)').eq(1).type('Peter')
      cy.get('input:nth-child(1)').eq(2).type('Heinz')
      cy.get('[data-test-id="button-submit"]').click()
      cy.url().should('contain', '/record/')
      cy.get('[data-test-id="button-clone"]').click()
      cy.get('input:nth-child(1)').eq(0).clear().type('26')
      cy.get('input:nth-child(1)').eq(1).clear().type('Chris')
      cy.get('input:nth-child(1)').eq(2).clear().type('Pop')
      cy.get('[data-test-id="button-submit"]').click()
      cy.url().should('contain', '/record/')
    })
  })
})
