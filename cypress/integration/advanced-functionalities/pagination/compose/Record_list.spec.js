/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing pagination & sorting of compose record list', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Testing pagination of compose record list', () => {
    it('should be able to add a namespace with three records for the purpose of this test', () => {
      cy.intercept('/api/compose/namespace/').as('namespace-list')
      cy.visit(composeURL + '/namespaces')
      cy.wait('@namespace-list')
      cy.get('[data-test-id="button-manage-namespaces"]').click({ force: true })
      cy.get('[data-test-id="button-create"]').click({ force: true })
      cy.get('[data-test-id="input-name"]').type('Test')
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('[data-test-id="button-visit-namespace"]').click({ force: true })
      cy.get('[data-test-id="button-module-create"]').click({ force: true })
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('[data-test-id="button-record-page-create"]', { timeout: 10000 }).click({ force: true })
      cy.get('.related-pages-dropdown').click({ force: true })
      cy.get('[data-test-id="dropdown-link-record-list-page-create"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="dropdown-link-record-list-page-edit"]', { timeout: 10000 }).click({ force: true })
      cy.get('a[title="Edit page"]', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="checkbox-page-visibility"]', { timeout: 10000 }).should('exist').check({ force: true })
      cy.get('[data-test-id="button-save"]', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="checkbox-page-visibility"]', { timeout: 10000 }).should('be.checked')
      cy.get('[data-test-id="button-page-builder"]').should('exist').click({ force: true })
      cy.get('[data-test-id="button-add-record"]', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('fieldset:first input', { timeout: 10000 }).type('John')
      cy.get('[data-test-id="button-submit"]', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="button-clone"]', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('fieldset:first input', { timeout: 10000 }).clear().type('Mark')
      cy.get('[data-test-id="button-submit"]', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="button-clone"]', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('fieldset:first input', { timeout: 10000 }).clear().type('Henry')
      cy.get('[data-test-id="button-submit"]', { timeout: 20000 }).should('exist').click({ force: true })
    })

    it('should be able to show total record count and limit the records per page', () => {
      cy.get('.nav-sidebar a:first', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="button-page-builder"]', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="button-edit"]:first', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="page-block-configurator"]', { timeout: 10000 })
        .contains('Record list')
        .click({ force: true })
      cy.get('[data-test-id="input-records-per-page"]', { timeout: 10000 }).clear().type('1')
      cy.get('[data-test-id="show-total-record-count"][type="checkbox"]', { timeout: 10000 })
        .check({ force: true })
      // We click on Save and close
      cy.get('.modal-footer .btn-primary', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="button-save"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-public"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-page-builder"]').click({ force: true })
      cy.get('[data-test-id="pagination-range"]', { timeout: 10000 })
        .should('exist')
        .should('contain', '3 records')
      cy.get('[data-test-id="next-page"]', { timeout: 10000 }).click({ force: true })
      // When on second page we check if the record count is changed
      cy.get('[data-test-id="pagination-range"]').should('contain', '2 - 2 of 3 records')
    })

    it('should be able to display one record count if one record is present', () => {
      cy.get('.RecordList').within(() => {
        cy.get('[data-test-id="input-search"]').type('John')
      })
      cy.get('[data-test-id="pagination-single-number"]').should('contain', 'One record')
    })

    it('should be able to test the full page navigation', () => {
      cy.get('.RecordList').within(() => {
        cy.get('[data-test-id="input-search"]').clear()
      })
      cy.get('[data-test-id="button-edit"]').click()
      // We click on the record list tab in the block
      cy.get('[data-test-id="page-block-configurator"]').contains('Record list').click()
      cy.get('[data-test-id="hide-page-navigation"][type="checkbox"]').check({ force: true })
      // We click on Save and close
      cy.get('.modal-footer .btn-primary', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="button-save"]').click()
      cy.get('[data-test-id="pagination-range"]').should('contain', '1', '2', '3')
    })

    it('should be able to test the last and first page buttons', () => {
      // We click on the last page button
      cy.get('[data-test-id="pagination"] li:last button', { timeout: 10000 })
        .should('exist')
        .click({ force: true })
      cy.get('[data-test-id="pagination-range"]').should('contain', '3 - 3 of 3 records')
      // We click on the first page button
      cy.get('[data-test-id="pagination"] li:first button', { timeout: 10000 })
        .should('exist')
        .click({ force: true })
      cy.get('[data-test-id="pagination-range"]').should('contain', '1 - 1 of 3 records')
    })
  })
})
