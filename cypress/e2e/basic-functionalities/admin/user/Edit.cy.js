/// <reference types="cypress" />
import { provisionAll, provisionAutomatedUserCreate } from '../../../../provision/list'

const adminURL = Cypress.env('ADMIN_URL')

describe('Test for editing a user', () => {
  before(() => {
    cy.seedDb( [...provisionAll, ...provisionAutomatedUserCreate])
  })

  beforeEach(() => {
    cy.preTestLogin({ url: adminURL })
    
    cy.visit(adminURL + '/')
    
    cy.navigateAdmin({ app: 'Users' })
  })

  context('Test for checking that delete, suspend, revoke and new buttons are displayed when in edit mode', () => {
    it('should be displayed when editing a user', () => {
      cy.intercept('/api/system/users/?query=automated&deleted=0&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('automated_user')
      cy.searchItem({ item: 'automated' })
      cy.wait('@automated_user')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click()
      cy.get('[data-test-id="button-new-user"]').should('exist')
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="button-delete"]').should('exist')
        cy.get('[data-test-id="button-suspend"]').should('exist')
        cy.get('[data-test-id="button-sessions-revoke"]').should('exist')
      })
    })
  })

  context('Test for editing a user', () => {
    it('should be able to edit the user', () => {
      cy.intercept('/api/system/users/?query=automated&deleted=0&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('automated_user')
      cy.intercept('/api/system/users/?query=edited&deleted=0&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('edited_user')

      cy.searchItem({ item: 'automated' })
      cy.wait('@automated_user')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click()

      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').clear().type('edited@email.com')
        cy.get('[data-test-id="input-name"]').clear().type('Edited automated name')
        cy.get('[data-test-id="input-handle"]').clear().type('edited_handle')
        cy.get('[data-test-id="button-submit"]').click()
      })

      cy.navigateAdmin({ app: 'Users' })
      cy.searchItem({ item: 'edited' })
      cy.wait('@edited_user')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click()
    
      cy.get('[data-test-id="card-user-info"]').within(() => {
        cy.get('[data-test-id="input-email"]').should('have.value', 'edited@email.com')
        cy.get('[data-test-id="input-name"]').should('have.value', 'Edited automated name')
        cy.get('[data-test-id="input-handle"]').should('have.value', 'edited_handle')
        cy.get('[data-test-id="input-updated-at"]').should('exist')
      })
      cy.get('.nav-sidebar').contains('Users').click()
      cy.contains('Edited automated name').should('exist')
    })
  })

  context('Test for checking if you can create a user through edit mode', () => {
    it('should be able to create a user', () => {
      cy.intercept('/api/system/users/?query=automated&deleted=0&suspended=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC').as('create_user')
      cy.searchItem({ item: 'automated' })
      cy.wait('@create_user')
      cy.wait(1000)
      cy.get('#resource-list > tbody > tr:last').should('exist').click()
      cy.get('[data-test-id="button-new-user"]').click()
      cy.url().should('contain', '/new')
    })
  })
})
