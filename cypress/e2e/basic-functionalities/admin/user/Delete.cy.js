/// <reference types="cypress" />
import { provisionAll, provisionAutomatedUserCreate } from '../../../../provision/list'

const adminURL = Cypress.env('ADMIN_URL')

describe('Test for deleting a user', () => {
  before(() => {
    cy.seedDb( [...provisionAll, ...provisionAutomatedUserCreate]).then(() => {
      cy.preTestLogin({ url: adminURL })
      cy.visit(adminURL + '/')
    })
  })

  context('Test for deleting a user', () => {
    it('should be able to delete a user', () => {
      cy.intercept('/api/system/users/?query=automated&deleted=0&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('delete_user')
      cy.intercept('/api/system/users/?query=missing&deleted=0&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('missing_user')

      cy.navigateAdmin({ app: 'Users' })
      cy.searchItem({ item: 'automated' })
      cy.wait('@delete_user')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click()
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm', { timeout: 10000 })
          .click({ force: true })
      })

      cy.contains('automated', { timeout: 10000 }).should('not.exist')
    })
  })
})
