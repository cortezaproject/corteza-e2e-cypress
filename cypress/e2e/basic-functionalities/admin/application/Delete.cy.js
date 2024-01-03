/// <reference types="cypress" />
import { provisionAll, provisionAutomatedAppCreate } from '../../../../provision/list'

const adminURL = Cypress.env('ADMIN_URL')

describe('Test for deleting an application', () => {
  before(() => {
    cy.seedDb( [...provisionAll, ...provisionAutomatedAppCreate]).then(() => {
      cy.preTestLogin({ url: adminURL })
    })
  })

  context('Test for deleting an application', () => {
    it('should be able to delete it', () => {
      cy.intercept('/api/system/application/?query=automated+application&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('app')
      cy.navigateAdmin({ app: 'Applications' })
      
      cy.get('[data-test-id="input-search"]').type('automated application')
      cy.wait('@app')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click({ force: true })
      cy.get('[data-test-id="card-application-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      cy.get('[data-test-id="input-search"]').type('automated application')
      cy.contains('automated application').should('not.exist')
    })
  })
})
