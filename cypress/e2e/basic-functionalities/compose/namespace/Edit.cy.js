/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for editing a namespace', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test if export, permissions, clone and delete buttons are displayed when in edit mode', () => {
    it('should be displayed when into edit mode', () => {
      cy.intercept("/api/compose/namespace/?query=cypress&limit=100&incTotal=true&pageCursor=&sort=name+ASC").as("ns_cypress")
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.wait("@ns_cypress")
      cy.get('tbody').contains('cypress').should('exist').click()
      cy.get('[data-test-id="button-export-namespace"]').should('exist')
      cy.get('[data-test-id="button-permissions"]').should('exist')
      cy.get('[data-test-id="button-clone"]').should('exist')
      cy.get('[data-test-id="button-delete"]').should('exist')
    })
  })

  context('Test for editing a namespace', () => {
    it('should be able to edit the name, the handle and the description', () => {
      cy.intercept("/api/compose/namespace/?query=cypress&limit=100&incTotal=true&pageCursor=&sort=name+ASC").as("ns_cypress")
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.wait("@ns_cypress")
      cy.get('tbody').contains('cypress').should('exist').click()
      cy.get('[data-test-id="input-name"]').clear().type('Edited namespace')
      cy.get('[data-test-id="input-slug"]').clear().type('edited_namespace')
      cy.get('[data-test-id="input-subtitle"]').clear().type('Edited subtitle')
      cy.get('[data-test-id="input-description"]').clear().type('Edited description')
      cy.get('[data-test-id="button-save"]').click({ force: true })
    })

    it('should be edited', () => {
      cy.intercept("/api/compose/namespace/?query=edited&limit=100&incTotal=true&pageCursor=&sort=name+ASC").as("ns_edited")
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="input-search"]').type('edited')
      cy.wait("@ns_edited")
      cy.get('tbody').contains('edited').should('exist').click()
      cy.get('[data-test-id="input-name"]').should('have.value', 'Edited namespace')
      cy.get('[data-test-id="input-slug"]').should('have.value', 'edited_namespace')
      cy.get('[data-test-id="input-subtitle"]').should('have.value', 'Edited subtitle')
      cy.get('[data-test-id="input-description"]').should('have.value', 'Edited description')
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('be.checked')
    })
  })
})
