/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for checking the route filters of an integration gateway', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for checking the route filters of an integration gateway', () => {
    it('should be able to enable and disable the pre filtering header filter', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Integration Gateway').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="input-search"]').type('/testEdited')
      cy.get('#resource-list > tbody > tr:last > td:last > a').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(0)').click()
        cy.get('[data-test-id="header"]:eq(0)').click()
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(0)')
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="header"]:eq(0).disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // We check that the filter is added and the status Enabled exists
        cy.contains('Enabled').should('exist')
        // Next we remove the filter and see if it gets removed
        cy.contains('Remove').click()
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the pre filtering profiler filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(0)').click()
        cy.get('[data-test-id="profiler"]:eq(0)').click()
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(0)').click()
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="profiler"]:eq(0).disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // We check that the filter is added and the status Enabled exists
        cy.contains('Enabled').should('exist')
        // Next we remove the filter and see if it gets removed
        cy.contains('Remove').click()
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the pre filtering query parameters filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(0)').click()
        cy.get('[data-test-id="query-parameters"]:eq(0)').click()
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(0)').click()
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="query-parameters"]:eq(0).disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // We check that the filter is added and the status Enabled exists
        cy.contains('Enabled').should('exist')
        // Next we remove the filter and see if it gets removed
        cy.contains('Remove').click()
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the processing proxy processer filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // We click on the Processing filter list
        cy.get('div > ul > li:eq(1)').click()
        // We wait 1s in order the page to be fully loaded
        cy.wait(1000)
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(1)').click({ force: true })
        cy.get('[data-test-id="proxy-processer"]:eq(1)').click()
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(1)').click({ force: true })
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="proxy-processer"]:eq(1).disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // We check that the filter is added and the status Enabled exists
        cy.contains('Enabled').should('exist')
        // Next we remove the filter and see if it gets removed
        cy.contains('Remove').click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the processing payload processer filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(1)').click({ force: true })
        cy.get('[data-test-id="payload-processer"]:eq(1)').click()
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(1)').click({ force: true })
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="payload-processer"]:eq(1).disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // We check that the filter is added and the status Enabled exists
        cy.contains('Enabled').should('exist')
        // Next we remove the filter and see if it gets removed
        cy.contains('Remove').click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the processing workflow processer filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(1)').click({ force: true })
        cy.get('[data-test-id="workflow-processer"]:eq(1)').click()
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(1)').click({ force: true })
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="workflow-processer"]:eq(1).disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // We check that the filter is added and the status Enabled exists
        cy.contains('Enabled').should('exist')
        // Next we remove the filter and see if it gets removed
        cy.contains('Remove').click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the postfiltering default JSON response filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // We click on the Postfiltering filter list
        cy.get('div > ul > li:eq(2)').click()
        // We wait 1s in order the page to be fully loaded
        cy.wait(1000)
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(2)').click({ force: true })
        cy.get('[data-test-id="default-json-response"]:eq(2)').click()
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(2)').click({ force: true })
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="default-json-response"]:eq(2).disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // We check that the filter is added and the status Enabled exists
        cy.contains('Enabled').should('exist')
        // Next we remove the filter and see if it gets removed
        cy.contains('Remove').click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the postfiltering JSON response filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(2)').click({ force: true })
        cy.get('[data-test-id="json-response"]:eq(2)').click()
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(2)').click({ force: true })
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="json-response"]:eq(2).disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // We check that the filter is added and the status Enabled exists
        cy.contains('Enabled').should('exist')
        // Next we remove the filter and see if it gets removed
        cy.contains('Remove').click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the postfiltering redirection filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(2)').click({ force: true })
        cy.get('[data-test-id="redirection"]:eq(2)').click()
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(2)').click({ force: true })
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="redirection"]:eq(2).disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // We check that the filter is added and the status Enabled exists
        cy.contains('Enabled').should('exist')
        // Next we remove the filter and see if it gets removed
        cy.contains('Remove').click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })
  })
})
