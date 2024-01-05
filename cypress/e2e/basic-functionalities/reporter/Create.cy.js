/// <reference types="cypress" />
const reporterURL = Cypress.env('REPORTER_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a report', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: reporterURL })
    }
  })

  context('Test for creating a report without any data entered or misconfigured field', () => {
    it('should not be able to create a report without any data entered', () => {
      cy.get('[data-test-id="button-create-report"]').click({ force: true })
      cy.get('[data-test-id="button-save"].disabled')
    })

    it('should not be able to create a report with missing name', () => {
      cy.get('[data-test-id="input-handle"]').type('handle')
      cy.get('[data-test-id="button-save"].disabled')
    })

    it('should not be able to create a report with incorrect handle', () => {
      cy.get('[data-test-id="input-handle"]').type('h')
      cy.get('[data-test-id="button-save"].disabled')
    })
  })

  context('Test for checking if the new report, permissions and delete buttons are not displayed', () => {
    it('should not be displayed when into the new report view', () => {
      cy.get('[data-test-id="button-create-report"]').should('not.exist')
      cy.get('[data-test-id="button-permissions"]').should('not.exist')
      cy.get('[data-test-id="button-delete"]').should('not.exist')
    })
  })

  context('Test for creating standard report using the create report button', () => {
    it('should be able to create a report', () => {
      cy.get('[data-test-id="button-back"]').click({ force: true })
      cy.get('[data-test-id="button-create-report"]').click({ force: true })
      cy.get('[data-test-id="input-name"]').type('Cypress report')
      cy.get('[data-test-id="input-handle"]').type('cypress_handle')
      cy.get('[data-test-id="input-description"]').type('This is an automated description.')
      cy.get('[data-test-id="button-save"]').click({ force: true })
    })

    it('should exist', () => {
      cy.get('[data-test-id="input-name"]', { timeout: 10000 }).should('have.value', 'Cypress report')
      cy.get('[data-test-id="input-handle"]', { timeout: 10000 }).should('have.value', 'cypress_handle')
      cy.get('[data-test-id="input-description"]', { timeout: 10000 })
        .should('have.value', 'This is an automated description.')
      cy.get('[data-test-id="button-report-builder"]').click({ force: true })
      cy.contains('Cypress report')
      cy.get('[data-test-id="button-back"]').click({ force: true })
    })

    it('should be able to create a report with missing handle', () => {
      cy.intercept('/api/system/reports/?query=&limit=100&incTotal=true&sort=handle+ASC')
        .as('reports')
      cy.visit(reporterURL + '/list')
      cy.wait('@reports')
      cy.get('[data-test-id="button-create-report"]').click({ force: true })
      cy.get('[data-test-id="input-name"]').type('Test')
      cy.get('[data-test-id="button-save"]').click({ force: true })
    })

    it('should exist', () => {
      cy.get('[data-test-id="input-name"]').should('have.value', 'Test')
      cy.get('[data-test-id="input-handle"]').should('have.value', '')
      cy.get('[data-test-id="button-report-builder"]').click({ force: true })
      cy.contains('Test')
      cy.get('[data-test-id="button-back"]').click({ force: true })
    })
  })

  // context('Test for checking if permissions open up when in edit mode', () => {
  //   it('should be able to open permissions view', () => {
  //     // We click on the created report
  //     cy.get('table > tbody > :first-child() > :last-child() > a:nth-child(2)').click({ force: true })
  //     cy.get('[data-test-id="button-permissions"]').click({ force: true })
  //     // Once permissions view open, we close the view
  //     cy.get('.close').click({ multiple: true })
  //     cy.get('[data-test-id="button-back"]').click({ force: true })
  //   })
  // })

  // context('Test for checking if new report and delete buttons are present when in edit mode', () => {
  //   it('should be able to access new report and delete buttons', () => {
  //     // We click on the report
  //     cy.get('table > tbody > :first-child()').click({ force: true })
  //     cy.get('[data-test-id="button-create-report"]')
  //     cy.get('[data-test-id="button-delete"]')
  //     cy.get('[data-test-id="button-back"]').click({ force: true })
  //   })
  // })

  context('Test for creating a new report through the edit mode', () => {
    it('should be able to create a new report through the edit mode of the previous report', () => {
      cy.intercept('/api/system/reports/?query=&limit=100&incTotal=true&sort=handle+ASC')
        .as('reports')
      cy.visit(reporterURL + '/list')
      cy.wait('@reports')
      cy.get('table > tbody > :first-child()').click({ force: true })
      cy.get('[data-test-id="button-create-report"]').click({ force: true })
      cy.get('[data-test-id="input-name"]').type('Another cypress report')
      cy.get('[data-test-id="input-handle"]').type('another_cypress_report')
      cy.get('[data-test-id="input-description"]').type('This is another automated description.')
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('[data-test-id="button-back"]').click({ force: true })
    })
  })

  context('Test for creating a report with a same handle as another', () => {
    it('should not be able to create another report with the same handle', () => {
      cy.get('[data-test-id="button-create-report"]').click({ force: true })
      cy.get('[data-test-id="input-name"]').type('Name')
      cy.get('[data-test-id="input-handle"]').type('cypress_handle')
      cy.get('[data-test-id="button-save"]').click({ force: true })
    })
  })
})
