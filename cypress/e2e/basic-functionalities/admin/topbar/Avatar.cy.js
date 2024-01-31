/// <reference types="cypress" />
import { provisionAll } from '../../../../provision/list'

const adminURL = Cypress.env('ADMIN_URL')
const baseURL = Cypress.env('HOST')

describe('Test avatar functionalities', () => {
  before(() => {
    cy.seedDb(provisionAll)
  })

  beforeEach(() => {
    cy.preTestLogin({ url: adminURL })
    cy.visit(adminURL + '/')
  })

  context('Test for checking logged in user', () => {
    it('should be able to see username and relevant links', () => {
      cy.get('[data-test-id="dropdown-profile"]').click({ force: true })
      cy.get('[data-test-id="dropdown-item-username"]').contains('Cypress test account')
      
      cy.get('[data-test-id="dropdown-profile-user"]').url('exist', '/auth')
      cy.get('[data-test-id="dropdown-profile-change-password"]').url('exist', '/auth/change-password')
    })
  })

  context('Test for logging out the user', () => {
    it('should be able to log out', () => {
      cy.get('[data-test-id="dropdown-profile-logout"]').click({ force: true })
      cy.url().should('include', baseURL + '/auth/logout')
    })
  })
})
