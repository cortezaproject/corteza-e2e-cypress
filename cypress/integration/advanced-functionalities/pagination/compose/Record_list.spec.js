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
    it('should be able to show total record count and limit the records per page', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]').click({ force: true })
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="button-page-builder"]').click()
      cy.get('[data-test-id="button-edit"]').click()
      cy.get('[data-test-id="page-block-configurator"]').contains('Record list').click()
      cy.get('[data-test-id="link-select-all"]').click()
      cy.get('[data-test-id="input-records-per-page"]').clear().type('2')
      cy.get('[data-test-id="show-total-record-count"]').check({ force: true })
      // We click on Save and close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="button-save-and-close"]').click()
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="button-public"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="pagination-range"]').should('contain', '7 records')
      cy.get('[data-test-id="next-page"]').click()
      // When on second page we check if the record count is changed
      cy.get('[data-test-id="pagination-range"]').should('contain', '3 - 4')
    })

    it('should be able to display one record count if one record is present', () => {
      cy.get('.RecordList').within(() => {
        cy.get('[data-test-id="input-search"]').type('pop')
        // We wait 1s in order the page to be fully loaded
        cy.wait(1000)
      })
      cy.get('[data-test-id="pagination-single-number"]').should('contain', 'One record')
    })

    it('should be able to display 2 records count if two records are present', () => {
      cy.get('.RecordList').within(() => {
        cy.get('[data-test-id="input-search"]').clear().type('in')
        // We wait 1s in order the page to be fully loaded
        cy.wait(1000)
      })
      cy.get('[data-test-id="pagination-single-number"]').should('contain', '2 records')
    })

    it('should be able to test the full page navigation', () => {
      cy.get('.RecordList').within(() => {
        cy.get('[data-test-id="input-search"]').clear()
        // We wait 1s in order the page to be fully loaded
        cy.wait(1000)
      })
      cy.get('[data-test-id="button-page-builder"]').click()
      cy.get('[data-test-id="button-edit"]').click()
      // We click on the record list tab in the block
      cy.get('[data-test-id="page-block-configurator"]').contains('Record list').click()
      cy.get('[data-test-id="hide-page-navigation"]').check({ force: true })
      // We click on Save and close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="button-save-and-close"]').click()
      // We wait 2s in order the page to be fully loaded
      cy.wait(2000)
      cy.get('[data-test-id="button-public"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="pagination-range"]').should('contain', '1', '2', '3')
    })

    it('should be able to test the last and first page buttons', () => {
      // We click on the last page button
      cy.get('[data-test-id="pagination"] > li:last').click()
      cy.get('[data-test-id="pagination-range"]').should('contain', '7 - 7')
      // We click on the first page button
      cy.get('[data-test-id="pagination"] > li:first').click()
      cy.get('[data-test-id="pagination-range"]').should('contain', '1 - 2')
    })

    it('should be able to test the sorting', () => {
      // We click on the age sorting button
      cy.get('[data-test-id="table-record-list"] > thead > tr > th:eq(1) > div > div > button > div > svg:eq(0)').click()
      // We check if the records are sorted in ascending order
      cy.get('[data-test-id="table-record-list"] > tbody > tr:first > td:eq(1)').contains('23')
      cy.get('[data-test-id="table-record-list"] > tbody > tr:last > td:eq(1)').contains('26')
    })
  })
})
