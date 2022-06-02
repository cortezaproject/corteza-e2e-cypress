/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
// Before running this test first run the Server test 2 in order to create a user so you can log in.
describe('Test for creating a report', () => {
  context('Test for logging in the user', () => {
    it('should be able to log in successfully', () => {
      cy.visit(baseURL + '/') // Localhost in the env file should be changed to reflect the Reporter host. We are visiting the main authentication page here.
      cy.get('[data-test-id="input-email"]').type('cypress@test.com')
      cy.get('[data-test-id="input-password"]').type('cypress123')
      cy.get('[data-test-id="button-login-and-remember"]').click()
      cy.visit(baseURL + '/list') // Visiting main page of Reporter
    })
  })

  context('Test for creating a report without any data entered', () => {
    it('should not be able to create a report', () => {
      cy.get('[data-test-id="button-create-report"]').click()
      cy.get('[data-test-id="button-save"].disabled')
    })
  })

  context('Test for creating a report with one missing required field', () => {
    it('should not be able to create a report with missing name', () => {
      cy.get('[data-test-id="input-handle"]').type('handle')
      cy.get('[data-test-id="button-save"].disabled')
    })

    it('should not be able to create a report with missing handle', () => {
      cy.get('[data-test-id="input-handle"]').clear()
      cy.get('[data-test-id="input-name"]').type('Name')
      cy.get('[data-test-id="button-save"].disabled')
    })
  })

  context('Test for creating a report with misconfigured handle', () => {
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
      cy.get('.b-toast-success') // We check if the success toast appears
      
      cy.get('[data-test-id="input-name"]').should('have.value', 'Cypress report')
      cy.get('[data-test-id="input-handle"]').should('have.value', 'cypress_handle')
      cy.get('[data-test-id="input-description"]').should('have.value', 'This is an automated description.')
      cy.get('[data-test-id="button-report-builder"]').click()
      cy.contains('Cypress report')
      cy.get('[data-test-id="button-back"]').click()
     
      cy.get('table > tbody > :first-child()').click() // We click on the created report
      cy.get('.b-toast-danger').should('not.exist') // We check that an error toast doesn't appear
      cy.visit(baseURL + '/list') // Visiting main page of Reporter
    })
  })

  context('Test for checking if permissions open up when in edit mode', () => {
    it('should be able to open permissions view', () => {
      cy.get('table > tbody > :first-child() > :last-child() > a:nth-child(2)').click() // We click on the Edit button on the created report
      cy.get('[data-test-id="button-permissions"]').click()
      cy.get('.close').click({ multiple: true }) // Once permissions view open, we close the view
      cy.get('[data-test-id="button-back"]').click()
    })
  })

  context('Test for checking if new report and delete buttons are present when in edit mode', () => {
    it('should be able to access new report and delete buttons', () => {
      cy.get('table > tbody > :first-child() > :last-child() > a:nth-child(2)').click() // We click on the Edit button on the created report
      cy.get('[data-test-id="button-create-report"]')
      cy.get('[data-test-id="button-delete"]')
      cy.get('[data-test-id="button-back"]').click()
    })
  })

  context('Test for creating a new report through the edit mode', () => {
    it('should be able to create a new report through the edit mode of the previous report', () => {
      cy.get('table > tbody > :first-child() > :last-child() > a:nth-child(2)').click() // We click on the edit button on the created report
      cy.get('[data-test-id="button-create-report"]').click()
      cy.get('[data-test-id="input-name"]').type('Another cypress report')
      cy.get('[data-test-id="input-handle"]').type('another_cypress_report')
      cy.get('[data-test-id="input-description"]').type('This is another automated description.')
      cy.get('[data-test-id="button-save"]').click()
      cy.get('.b-toast-success') // We check if the success toast appears
      cy.get('[data-test-id="button-back"]').click()
    })
  })

  context('Test for creating a report with a same handle as another', () => {
    it('should not be able to create another report with the same handle', () => {
      cy.get('[data-test-id="button-create-report"]').click()
      cy.get('[data-test-id="input-name"]').type('Name')
      cy.get('[data-test-id="input-handle"]').type('cypress_handle')
      cy.get('[data-test-id="button-save"]').click()
      cy.get('.b-toast-danger') // We check if the danger toast appears
    })
  })
})
