/// <reference types="cypress" />
import { provisionAll, provisionAutomatedRoleCreate } from '../../../../provision/list'

const adminURL = Cypress.env('ADMIN_URL')

describe('Test for deleting a role', () => {
  before(() => {
    cy.seedDb( [...provisionAll, ...provisionAutomatedRoleCreate]).then(() => {
      cy.preTestLogin({ url: adminURL })
      cy.visit(adminURL + '/')
      cy.navigateAdmin({ app: 'Roles' })
    })
  })

  context('Test for deleting a role', () => {
    it('should be able to delete it', () => {
      cy.intercept('/api/system/roles/?query=automated&deleted=0&archived=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('role')
      cy.searchItem({ item: 'automated' })
      cy.contains('automated', { timeout: 10000 }).should('exist')
      cy.wait('@role')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click()
      cy.get('[data-test-id="card-role-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })

      cy.navigateAdmin({ app: 'Roles' })
      cy.searchItem({ item: 'automated' })
      cy.contains('automated', { timeout: 10000 }).should('not.exist')
    })
  })
})
