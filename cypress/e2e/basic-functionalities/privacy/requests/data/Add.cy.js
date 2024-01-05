/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')

describe('Test for adding compose data that will be used for different types of requests', () => {
  context('Test for adding record data', () => {
    it('should add a namespace', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="input-name"]').type('Privacy data')
      cy.get('[data-test-id="input-slug"]').type('privacy_data')
      cy.get('[data-test-id="button-save"]').click()
    })

    it('should add a module', () => {
      cy.get('[data-test-id="button-visit-namespace"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-admin"]').click()
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="input-module-name"]').type('Privacy module')
      cy.get('[data-test-id="input-module-handle"]').type('privacy_module')
      cy.get('[data-test-id="table-module-fields"] > tbody').find('tr').eq(0).within(() => {
        cy.get('input:first').clear().type('name')
        cy.get('input:eq(1)').type('Name')
      })
    })

    it('should select sensitivity level in module', () => {
      cy.get('.nav-item').contains('Privacy').click()
      cy.get('[data-test-id="select-sens-lvl"]').click()
      cy.get('.tab-pane.active input[type="search"]').type('level_1{enter}')
    })

    it('should set sensitivity level of filed', () => {
      cy.get('.nav-item').contains('Fields').click()
      cy.get('[data-test-id="table-module-fields"] > tbody').find('tr').eq(0).within(() => {
        cy.get('[data-test-id="button-configure-field"]').click()
      })
      cy.get('.modal-content').within(() => {
        cy.get('.nav-item').contains('Privacy').click()
        cy.get('[data-test-id="select-sens-lvl"]').click().type('level_1{enter}')
        cy.get('#permissions-modal [data-test-id="button-save"]').click({ force: true })
      })
      cy.get('[data-test-id="button-save"]', { timeout: 10000 }).click({ force: true })
    })

    it('should add a record', () => {
      cy.wait(1000)
      cy.get('[data-test-id="button-all-records"] a').should('exist').click({ force: true })
      cy.get('[data-test-id="button-add-record"]', { timeout: 10000 }).click({ force: true })
      cy.get('.card-body input:first', { timeout: 10000 }).type('John')
      cy.get('[data-test-id="button-save"]').click()
    })
  })
})
