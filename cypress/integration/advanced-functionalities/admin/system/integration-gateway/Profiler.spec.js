/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Testing profiler functionalities', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Testing profiler functionalities', () => {
    it('should not see requests when profiler is disabled', () => {
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
      cy.get('[data-test-id="card-requests"]').should('not.exist')
    })

    it('should be able to see the requests card when profiler is enabled', () => {
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        cy.get('[data-test-id="dropdown-add-filter"] > button:eq(0)').click()
        cy.get('[data-test-id="profiler"]:eq(0)').click()
      })
      // We click on Save & Close
      cy.get('.modal-footer > .btn-primary').click()
      cy.get('[data-test-id="card-filter-list"]').within(() => {
        // We check that the filter is added and the status Enabled exists
        cy.get('[data-test-id="button-submit"]').click()
      })
      cy.get('[data-test-id="card-requests"]').should('exist')
    })

    it('should be able to send a request and see if it is grouped', () => {
      cy.intercept('/api/system/apigw/route/?query=&deleted=0&limit=100&incTotal=true&sort=createdAt+DESC')
        .as('integration-gateway')
      cy.request('http://localhost:3000/api/gateway/testEdited')
      cy.request('http://localhost:3000/api/gateway/testEdited')
      cy.get('.nav-sidebar').find('a[href="/system/apigw"]').click({ force: true })
      cy.wait('@integration-gateway')
      cy.get('[data-test-id="button-profiler"]').click()
      cy.get('[data-test-id="card-profiler"]').within(() => {
        cy.get('tr:eq(1)').should('exist')
        // We check that the requests are grouped under one entry
        cy.get('tr:eq(2)').should('not.exist')
      })
    })

    it('should check if you open up a grouped request if you see all the requests listed', () => {
      cy.get('[data-test-id="card-profiler"]').within(() => {
        cy.get('tr:last > td:last > a').click()
      })
      cy.get('[data-test-id="card-requests"]').within(() => {
        cy.get('tr:eq(1)').should('exist')
        // We check that there are more requests, they are not grouped into one entry
        cy.get('tr:eq(2)').should('exist')
      })
    })

    it('should be able to see the requested route when viewing request details', () => {
      cy.get('tr:eq(1) > td:last > a').click()
      cy.get('[data-test-id="card-general-info"]').within(() => {
        cy.get('[data-test-id="input-route"]').should('have.value', '/testEdited')
      })
    })
  })
})
