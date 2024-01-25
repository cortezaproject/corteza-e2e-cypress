/// <reference types="cypress" />
import { provisionAll, provisionAutomatedAppCreate } from '../../../../provision/list'

const adminURL = Cypress.env('ADMIN_URL')

describe('Test for editing an application', () => {
  before(() => {
    cy.seedDb( [...provisionAll, ...provisionAutomatedAppCreate])
  })

  beforeEach(() => {
    cy.preTestLogin({ url: adminURL })
    
    cy.visit(adminURL + '/')
    
    cy.navigateAdmin({ app: 'Applications' })
  })

  context('Test for checking that new and delete buttons are displayed when in edit mode', () => {
    it('should be displayed when editing a template', () => {
      cy.intercept('/api/system/application/?query=automated+application&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('edit_app')

      cy.searchItem({ item: 'automated application' })
      cy.wait('@edit_app')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click()
      cy.get('[data-test-id="button-new-application"]').should('exist')
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').should('exist')
      })
    })
  })

  context('Test for editing an application', () => {
    it('should be able to edit the application', () => {
      cy.intercept('/api/system/application/?query=automated+application&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('edit_app')
      
      cy.searchItem({ item: 'automated application' })
      cy.wait('@edit_app')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click()

      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="input-name"]').clear().type('edited application')
        cy.get('[data-test-id="button-submit"]').click()
      })
    })
  })

  context('Test for checking if the application got edited', () => {
    it('should be edited', () => {
      cy.searchItem({ item: 'edited application' })
      cy.contains('edited application', { timeout: 10000 }).should('exist')
    })
  })

  context('Test for checking if you can create an application through edit mode', () => {
    it('should be able to create an application', () => {
      cy.intercept('/api/system/application/?query=edited&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('app')
      cy.searchItem({ item: 'edited' })
      cy.wait('@app')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click()
      cy.get('[data-test-id="button-new-application"]').click()
      cy.url().should('contain', '/new')
    })
  })
})
