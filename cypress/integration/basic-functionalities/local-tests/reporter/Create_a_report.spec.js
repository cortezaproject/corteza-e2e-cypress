/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

describe('Test for creating a report', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for creating a report without any data entered or misconfigured field', () => {
    it('should not be able to create a report without any data entered', () => {
      cy.get('[data-test-id="button-create-report"]').click()
      cy.get('[data-test-id="button-save"].disabled')
    })

    it('should not be able to create a report with missing name', () => {
      cy.get('[data-test-id="input-handle"]').type('handle')
      cy.get('[data-test-id="button-save"].disabled')
    })

    it('should not be able to create a report with missing handle', () => {
      cy.get('[data-test-id="input-handle"]').clear()
      cy.get('[data-test-id="input-name"]').type('Name')
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
      cy.get('[data-test-id="button-back"]').click()
      cy.get('[data-test-id="button-create-report"]').click()
      cy.get('[data-test-id="input-name"]').type('Cypress report')
      cy.get('[data-test-id="input-handle"]').type('cypress_handle')
      cy.get('[data-test-id="input-description"]').type('This is an automated description.')
      cy.get('[data-test-id="button-save"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success')

      cy.get('[data-test-id="input-name"]').should('have.value', 'Cypress report')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'cypress_handle')
      cy.get('[data-test-id="input-description"]').should('have.value', 'This is an automated description.')
      cy.get('[data-test-id="button-report-builder"]').click()
      cy.contains('Cypress report')
      cy.get('[data-test-id="button-back"]').click()

      // We click on the created report
      cy.get('table > tbody > :first-child()').click()
      // We check that an error toast doesn't appear
      cy.get('.b-toast-danger').should('not.exist')
      // Visiting main page of Reporter
      cy.visit(baseURL + '/list')
    })
  })

  context('Test for checking if permissions open up when in edit mode', () => {
    it('should be able to open permissions view', () => {
      // We click on the Edit button on the created report
      cy.get('table > tbody > :first-child() > :last-child() > a:nth-child(2)').click()
      cy.get('[data-test-id="button-permissions"]').click()
      // Once permissions view open, we close the view
      cy.get('.close').click({ multiple: true })
      cy.get('[data-test-id="button-back"]').click()
    })
  })

  context('Test for checking if new report and delete buttons are present when in edit mode', () => {
    it('should be able to access new report and delete buttons', () => {
      // We click on the Edit button on the created report
      cy.get('table > tbody > :first-child() > :last-child() > a:nth-child(2)').click()
      cy.get('[data-test-id="button-create-report"]')
      cy.get('[data-test-id="button-delete"]')
      cy.get('[data-test-id="button-back"]').click()
    })
  })

  context('Test for creating a new report through the edit mode', () => {
    it('should be able to create a new report through the edit mode of the previous report', () => {
      // We click on the edit button on the created report
      cy.get('table > tbody > :first-child() > :last-child() > a:nth-child(2)').click()
      cy.get('[data-test-id="button-create-report"]').click()
      cy.get('[data-test-id="input-name"]').type('Another cypress report')
      cy.get('[data-test-id="input-handle"]').type('another_cypress_report')
      cy.get('[data-test-id="input-description"]').type('This is another automated description.')
      cy.get('[data-test-id="button-save"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success')
      cy.get('[data-test-id="button-back"]').click()
    })
  })

  context('Test for creating a report with a same handle as another', () => {
    it('should not be able to create another report with the same handle', () => {
      cy.get('[data-test-id="button-create-report"]').click()
      cy.get('[data-test-id="input-name"]').type('Name')
      cy.get('[data-test-id="input-handle"]').type('cypress_handle')
      cy.get('[data-test-id="button-save"]').click()
      // We check if the danger toast appears
      cy.get('.b-toast-danger')
    })
  })
})
