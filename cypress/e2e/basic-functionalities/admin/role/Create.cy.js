/// <reference types="cypress" />
import { provisionAll } from '../../../../provision/list'

const adminURL = Cypress.env('ADMIN_URL')

describe('Test for creating a role', () => {
  before(() => {
    cy.seedDb( provisionAll)
  })

  beforeEach(() => {
    cy.preTestLogin({ url: adminURL })
    
    cy.visit(adminURL + '/')
    
    cy.navigateAdmin({ app: 'Roles' })
    cy.get('[data-test-id="button-new-role"]').click()
  })

  context('Test for creating a role without any data entered or misconfigured field', () => {
    it('should not be able to create a role without any data entered', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })

    it('should not be able to create a role with missing role name', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-handle"]').type('Handle')
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })

    it('should be able to create a role with missing handle', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('No handle')
        cy.get('[data-test-id="input-handle"]').clear()
        cy.get('[data-test-id="button-submit"]').click({ force: true })
      })
    })

    it('should not be able to create a role with misconfigured handle', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-handle"]').clear().type('H')
        cy.get('[data-test-id="button-submit"].disabled').should('exist')
      })
    })
  })

  context('Test for checking that delete, archive, and new buttons are not displayed when in create mode', () => {
    it('should not be displayed when creating a role', () => {
      cy.get('[data-test-id="button-new-role"]').should('not.exist')
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').should('not.exist')
        cy.get('[data-test-id="button-status"]').should('not.exist')
      })
    })
  })

  context('Test for creating a role', () => {
    it('should be able to create a role', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').clear().type('automated role')
        cy.get('[data-test-id="input-handle"]').clear().type('automated_role')
        cy.get('[data-test-id="button-submit"]').click()
        // We check if the submit button's content changed to a check icon
        cy.get('[data-icon="check"]') 
        cy.get('[data-test-id="button-submit"]').should('exist')
      })

      cy.intercept('/api/system/roles/?query=automated&deleted=0&archived=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('automated_role')
      cy.navigateAdmin({ app: 'Roles' })

      cy.get('[data-test-id="input-search"]').type('automated')
      cy.wait('@automated_role')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-created-at"]').should('exist')
      })
    })
  })

  context('Test for creating a role with same name and handle as another role', () => {
    it('should not be able to create a role with identical name', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').type('automated role')
        cy.get('[data-test-id="input-handle"]').type('duplicate_role')
        cy.get('[data-test-id="button-submit"]').click()
      })
    })
    
    it('should not be able to create a role with identical handle', () => {
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').clear().type('Duplicate role')
        cy.get('[data-test-id="input-handle"]').clear().type('automated_role')
        cy.get('[data-test-id="button-submit"]').click()
      })
    })
  })
})
