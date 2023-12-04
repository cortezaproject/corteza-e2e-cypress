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
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/apigw/route/?query=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('integration-gateway')
      cy.intercept('/api/system/apigw/route/?query=%2FtestEdited&deleted=0&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC')
        .as('search')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/apigw"]').click({ force: true })
      cy.wait('@integration-gateway')
      cy.get('[data-test-id="input-search"]').type('/testEdited')
      cy.wait('@search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(0)').click()
        cy.get('[data-test-id="header"]:eq(0)').click({ force: true })
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(0)')
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="header"]:eq(0).disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // Next we remove the filter and see if it gets removed
        cy.get('[data-test-id="button-delete"]:first').click()
        cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the pre filtering profiler filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(0)').click()
        cy.get('[data-test-id="profiler"]:eq(0)').click({ force: true })
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(0)').click()
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="profiler"]:eq(0).disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // Next we remove the filter and see if it gets removed
        cy.get('[data-test-id="button-delete"]:first').click()
        cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the pre filtering query parameters filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(0)').click()
        cy.get('[data-test-id="query-parameters"]:eq(0)').click({ force: true })
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(0)').click()
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="query-parameters"]:eq(0).disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // Next we remove the filter and see if it gets removed
        cy.get('[data-test-id="button-delete"]:first').click()
        cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the processing proxy processer filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('#processer').click({ force: true })
        cy.get('[data-test-id="dropdown-add-filter"] > button').click({ force: true })
        cy.get('[data-test-id="proxy-processer"]').click()
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button').click({ force: true })
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="proxy-processer"].disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // Next we remove the filter and see if it gets removed
        cy.get('[data-test-id="button-delete"]:eq(1)').click({ force: true })
        cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the processing payload processer filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button').click({ force: true })
        cy.get('[data-test-id="payload-processer"]').click({ force: true })
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button').click({ force: true })
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="payload-processer"].disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // Next we remove the filter and see if it gets removed
        cy.get('[data-test-id="button-delete"]:eq(1)').click({ force: true })
        cy.get('[data-test-id="button-delete-confirm"]', { timeout: 10000 }).click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the processing workflow processer filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button').click({ force: true })
        cy.get('[data-test-id="workflow-processer"]').click()
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click({ force: true })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button').click({ force: true })
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="workflow-processer"].disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // Next we remove the filter and see if it gets removed
        cy.get('[data-test-id="button-delete"]:eq(1)').click({ force: true })
        cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the postfiltering default JSON response filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('#postfilter').click({ force: true })
        cy.get('[data-test-id="dropdown-add-filter"] > button').click({ force: true })
        cy.get('[data-test-id="default-json-response"]').click()
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button').click({ force: true })
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="default-json-response"].disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // Next we remove the filter and see if it gets removed
        cy.get('[data-test-id="button-delete"]:eq(2)').click({ force: true })
        cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the postfiltering JSON response filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button').click({ force: true })
        cy.get('[data-test-id="response"]').click({ force: true })
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click({ force: true })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button').click({ force: true })
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="response"].disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // Next we remove the filter and see if it gets removed
        cy.get('[data-test-id="button-delete"]:eq(2)').click({ force: true })
        cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })

    it('should be able to enable and disable the postfiltering redirection filter', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button').click({ force: true })
        cy.get('[data-test-id="redirection"]').click()
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button').click({ force: true })
        // We check if the filter is grayed out indicating that it is selected
        cy.get('[data-test-id="redirection"].disabled').should('exist')
      })
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // Next we remove the filter and see if it gets removed
        cy.get('[data-test-id="button-delete"]:eq(2)').click({ force: true })
        cy.get('[data-test-id="button-delete-confirm"]').click({ force: true })
        cy.get('[data-test-id="no-filters"]').should('exist')
      })
    })
  })
})
