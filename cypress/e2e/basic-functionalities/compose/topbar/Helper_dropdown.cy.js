/// <reference types="cypress" />
import { provisionAll } from '../../../../provision/list'

const composeURL = Cypress.env('COMPOSE_URL')

describe('Test helper dropdown functionalities', () => {
  before(() => {
    cy.seedDb(provisionAll)
  })

  beforeEach(() => {
    cy.preTestLogin({ url: composeURL })
    cy.visit(composeURL + '/')
  })

  context('Test for checking helper links (forum, documentation, feedback)', () => {
    it('should be accessible', () => {
      cy.get('[data-test-id="dropdown-helper-forum"]').url('be.equal', 'https://forum.cortezaproject.org')
      cy.get('[data-test-id="dropdown-helper-docs"]').url('include', '/docs')
      cy.get('[data-test-id="dropdown-helper-feedback"]').url('be.equal', 'mailto:info@cortezaproject.org')
    })
  })
})
