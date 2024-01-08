/// <reference types="cypress" />
import { provisionAll } from '../../../../provision/list'

const reporterURL = Cypress.env('REPORTER_URL')

describe('Test helper dropdown functionalities', () => {
  before(() => {
    cy.seedDb(provisionAll)
  })

  beforeEach(() => {
    cy.preTestLogin({ url: reporterURL })
    cy.visit(reporterURL + '/')
  })

  context('Test for checking helper links (forum, documentation, feedback)', () => {
    it('should be accessible', () => {
      cy.get('[data-test-id="dropdown-helper-forum"]').url('be.equal', 'https://forum.cortezaproject.org')
      cy.get('[data-test-id="dropdown-helper-docs"]').url('include', '/docs')
      cy.get('[data-test-id="dropdown-helper-feedback"]').url('be.equal', 'mailto:info@cortezaproject.org')
    })
  })
})
