/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for un-deleting a messaging queue', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for un-deleting a messaging queue', () => {
    it('should check whether the correct buttons and states are shown', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/queues/?query=&limit=100&incTotal=true&sort=createdAt+DESC&deleted=0')
        .as('message-queues')
      cy.intercept('/api/system/queues/?query=&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC&deleted=2')
        .as('filter')
      cy.intercept('api/system/queues/?query=TestQueue&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC&deleted=2')
        .as('search')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/queue"]').click({ force: true })
      cy.wait('@message-queues')
      cy.get('[data-test-id="filter-deleted-queues"] input[value="2"]').click({ force: true })
      cy.wait('@filter')
      cy.get('[data-test-id="input-search"]').type('TestQueue')
      cy.wait('@search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="input-deleted-at"]').should('exist')
      cy.get('[data-test-id="input-updated-at"]').should('exist')
      cy.get('[data-test-id="input-created-at"]').should('exist')
      cy.get('[data-test-id="button-submit"]').should('exist')
      cy.get('[data-test-id="button-add"]').should('exist')
      cy.get('[data-test-id="button-delete"]').should('not.exist')
      cy.get('[data-test-id="button-undelete"]').should('exist')
    })

    it('should be able to un-delete a messaging queue', () => {
      cy.intercept('/api/system/queues/?query=&limit=100&incTotal=true&sort=createdAt+DESC&deleted=0')
        .as('message-queues')
      cy.intercept('api/system/queues/?query=TestQueue&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC&deleted=0')
        .as('search')
      cy.get('[data-test-id="button-undelete"]').click()
      cy.get('.confirmation-confirm').click()
      cy.get('.nav-sidebar').find('a[href="/system/queue"]').click({ force: true })
      cy.wait('@message-queues')
      cy.get('[data-test-id="input-search"]').type('TestQueue')
      cy.wait('@search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="input-deleted-at"]').should('not.exist')
    })
  })
})
