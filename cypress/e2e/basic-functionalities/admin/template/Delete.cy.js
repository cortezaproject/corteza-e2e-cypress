/// <reference types="cypress" />
import { provisionAll, provisionAutomatedTemplateCreate } from '../../../../provision/list'

const adminURL = Cypress.env('ADMIN_URL')

describe('Test for deleting a template', () => {
  before(() => {
    cy.seedDb( [...provisionAll, ...provisionAutomatedTemplateCreate]).then(() => {
      cy.preTestLogin({ url: adminURL })
      cy.visit(adminURL + '/')
      cy.navigateAdmin({ app: 'Templates' })
    })
  })

  context('Test for deleting a template', () => {
    it('should be able to delete a template', () => {
      cy.intercept('/api/system/template/?query=automated_template&handle=&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('delete_template')
      cy.searchItem({ item: 'automated_template' })
      cy.wait('@delete_template')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').click()
        cy.get('.confirmation-confirm').click()
      })
      cy.searchItem({ item: 'automated_template' })
      cy.contains('automated_template').should('not.exist')
    })
  })
})
