/// <reference types="cypress" />
import { provisionAll, provisionAutomatedTemplateCreate } from '../../../../provision/list'

const adminURL = Cypress.env('ADMIN_URL')

describe('Test for editing a template', () => {
  before(() => {
    cy.seedDb( [...provisionAll, ...provisionAutomatedTemplateCreate])
  })

  beforeEach(() => {
    cy.preTestLogin({ url: adminURL })
    
    cy.visit(adminURL + '/')
    
    cy.navigateAdmin({ app: 'Templates' })
  })

  context('Test for checking that new, delete and submit buttons are displayed when in edit mode', () => {
    it('should be displayed when editing a template', () => {
      cy.intercept('/api/system/template/?query=automated_template&handle=&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('edit_template')
      cy.get('[data-test-id="input-search"]').type('automated_template')
      cy.wait('@edit_template')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').click()
      cy.get('[data-test-id="button-new-template"]').should('exist')
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').should('exist')
        cy.get('[data-test-id="button-submit"]').should('exist')
      })
    })
  })

  context('Test for editing a template', () => {
    it('should be able to edit the template', () => {
      cy.intercept('/api/system/template/?query=automated_template&handle=&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('edit_template')
      cy.get('[data-test-id="input-search"]').type('automated_template')
      cy.wait('@edit_template')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').type(' edited')
        cy.get('[data-test-id="input-handle"]').type('_edited')
        cy.get('[data-test-id="textarea-description"]').type(' edited')
        cy.get('[data-test-id="button-submit"]').click()
      })
    })
  })

  context('Test for checking if the template got edited', () => {
    it('should be edited', () => {
      cy.intercept('/api/system/template/?query=automated_template&handle=&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('automated_template')
      cy.get('[data-test-id="input-search"]').type('automated_template')
      cy.wait('@automated_template')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').click()
      cy.get('[data-test-id="card-template-info"]').within(() => {
        cy.get('[data-test-id="input-short-name"]').should('have.value', 'automated template edited')
        cy.get('[data-test-id="input-handle"]').should('have.value', 'automated_template_edited')
        cy.get('[data-test-id="textarea-description"]').should('have.value', 'automated description edited')
        cy.get('[data-test-id="input-updated-at"]').should('exist')
      })

      cy.navigateAdmin({ app: 'Templates' })
      cy.get('[data-test-id="input-search"]').type('automated_template')
      cy.wait('@automated_template')
      cy.contains('automated_template_edited').should('exist')
    })
  })

  context('Test for checking if you can create a template through edit mode', () => {
    it('should be able to create a template', () => {
      // We should wait in order the search to be completed
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').click()
      cy.get('[data-test-id="button-new-template"]').click()
      cy.url().should('contain', '/new')
    })
  })
})
