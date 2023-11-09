/// <reference types="cypress" />
const privacyURL = Cypress.env('PRIVACY_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating an export request', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: privacyURL })
    }
  })

  context('Test for exporting data without selecting a data type', () => {
    it('should not be able to create a request', () => {
      cy.get('a[href="/request/export/new"]').click()
      cy.get('[data-test-id="button-export-selected-data"]').should('be.disabled')
    })
  })

  context('Test for successfully creating an export request', () => {
    it('should be able to export profile info as JSON', () => {
      cy.get('[data-test-id="checkbox-profile-information"]').check({ force: true })
      cy.get('[data-test-id="button-export-selected-data"]').click()
    })

    it('should check if exported data is correct', () => {
      cy.get('[data-test-id="badge-pending"]').should('exist')
      cy.get('[data-test-id="request-author"]').contains('Cypress test account')
      cy.get('[data-test-id="span-data-type"]').contains('Profile Information')
      cy.get('[data-test-id="span-date-range"]').contains('All of my data')
      cy.get('[data-test-id="span-file-format"]').contains('JSON')
    })
  })

  context('Test for successfully creating an export request', () => {
    it('should be able to export application data as CSV', () => {
      cy.get('[data-test-id="button-home"]').click()
      cy.get('a[href="/request/export/new"]').click()
      cy.get('[data-test-id="checkbox-application-data"]').check({ force: true })
      cy.get('[data-test-id="select-file-format"]').select('CSV')
      cy.get('[data-test-id="button-export-selected-data"]').click()
    })

    it('should check if exported data is correct', () => {
      cy.get('[data-test-id="badge-pending"]').should('exist')
      cy.get('[data-test-id="request-author"]').contains('Cypress test account')
      cy.get('[data-test-id="span-data-type"]').contains('Application Data')
      cy.get('[data-test-id="span-date-range"]').contains('All of my data')
      cy.get('[data-test-id="span-file-format"]').contains('CSV')
    })
  })

  context('Test for successfully creating an export request', () => {
    it('should be able to export profile info as JSON and CSV', () => {
      cy.get('[data-test-id="button-home"]').click()
      cy.get('a[href="/request/export/new"]').click()
      cy.get('[data-test-id="checkbox-profile-information"]').check({ force: true })
      cy.get('[data-test-id="checkbox-application-data"]').check({ force: true })
      cy.get('[data-test-id="button-export-selected-data"]').click()
    })

    it('should check if exported data is correct', () => {
      cy.get('[data-test-id="badge-pending"]').should('exist')
      cy.get('[data-test-id="request-author"]').contains('Cypress test account')
      cy.get('[data-test-id="span-data-type"]').contains('Profile Information')
      cy.get('[data-test-id="span-date-range"]').contains('All of my data')
      cy.get('[data-test-id="span-file-format"]').contains('JSON')
    })
  })

  context('Test for successfully creating an export request', () => {
    it('should be able to export profile info as JSON and CSV', () => {
      cy.get('[data-test-id="button-home"]').click()
      cy.get('a[href="/request/export/new"]').click()
      cy.get('[data-test-id="checkbox-profile-information"]').check({ force: true })
      cy.get('[data-test-id="checkbox-application-data"]').check({ force: true })
      cy.get('[data-test-id="select-file-format"]').select('CSV')
      cy.get('[data-test-id="button-export-selected-data"]').click({ force: true })
    })

    it('should check if exported data is correct', () => {
      cy.get('[data-test-id="badge-pending"]').should('exist')
      cy.get('[data-test-id="request-author"]').contains('Cypress test account')
      cy.get('[data-test-id="span-data-type"]').contains('Profile Information, Application Data')
      cy.get('[data-test-id="span-date-range"]').contains('All of my data')
      cy.get('[data-test-id="span-file-format"]').contains('CSV')
    })
  })

  context('Test for successfully creating an export request', () => {
    it('should be able to export profile info as JSON', () => {
      cy.get('[data-test-id="button-home"]').click()
      cy.get('a[href="/request/export/new"]').click()
      cy.get('[data-test-id="checkbox-profile-information"]').check({ force: true })
      cy.get('[data-test-id="button-export-selected-data"]').click()
    })

    it('should be able to export profile info as JSON', () => {
      cy.get('[data-test-id="button-home"]').click()
      cy.get('a[href="/request/export/new"]').click()
      cy.get('[data-test-id="checkbox-profile-information"]').check({ force: true })
      cy.get('[data-test-id="button-export-selected-data"]').click()
    })
  })
})
