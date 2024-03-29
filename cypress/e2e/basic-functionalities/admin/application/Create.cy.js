/// <reference types="cypress" />
import { provisionAll } from '../../../../provision/list'

const adminURL = Cypress.env('ADMIN_URL')

describe('Test for creating an application', () => {
  before(() => {
    cy.seedDb( provisionAll)
  })

  beforeEach(() => {
    cy.preTestLogin({ url: adminURL })
    
    cy.visit(adminURL + '/')
    
    cy.navigateAdmin({ app: 'Applications' })
    cy.get('[data-test-id="button-new-application"]').click()
  })

  context('Test for creating an application without a name entered', () => {
    it('should not be able to create an application', () => {
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })
  })

  context('Test for checking that delete and new buttons are not displayed when in create mode', () => {
    it('should not be displayed when creating an application', () => {
      cy.get('[data-test-id="button-new-application"]').should('not.exist')
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').should('not.exist')
      })
    })
  })

  context('Test for creating an application', () => {
    it('should be able to create an application', () => {
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('automated application')
        cy.get('[data-test-id="checkbox-enabled"] input').check({ force: true })
        cy.get('[data-test-id="button-submit"]').click({ force: true })
        // We check if the submit button's content changed to a check icon
        cy.get('[data-icon="check"]')
        cy.get('[data-test-id="button-submit"]', { timeout: 10000 }).should('exist')
      })

      cy.intercept('/api/system/application/?query=automated&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('created_app')
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').should('have.value', 'automated application')
      })

      cy.get('.nav-sidebar').contains('Applications').click()
      cy.get('[data-test-id="input-search"]').type('automated')
      cy.wait('@created_app')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click({ force: true })
      cy.get('[data-test-id="card-application-info"]', { timeout: 10000 }).within(() => {
        cy.get('[data-test-id="input-created-at"]').should('exist')
      })
    })
  })

  context('Test for creating an application with same name as an already created one', () => {
    it('should be able to create an application with identical name', () => {
      cy.get('.nav-sidebar').contains('Application').click()
      cy.get('[data-test-id="button-new-application"]').click()
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('automated application')
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('[data-test-id="input-created-at"]').should('exist')
    })
  })
})
