/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for editing a messaging queue', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for editing a messaging queue', () => {
    it('should check whether the correct buttons and states are shown', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/queues/?query=&limit=100&incTotal=true&sort=createdAt+DESC&deleted=0')
        .as('message-queues')
      cy.intercept('api/system/queues/?query=TestQueue&limit=100&incTotal=true&pageCursor=&sort=createdAt+DESC&deleted=0')
        .as('search')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/queue"]').click({ force: true })
      cy.wait('@message-queues')
      cy.get('[data-test-id="input-search"]').type('TestQueue')
      cy.wait('@search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="input-deleted-at"]').should('not.exist')
      cy.get('[data-test-id="input-updated-at"]').should('not.exist')
      cy.get('[data-test-id="input-created-at"]').should('exist')
      cy.get('[data-test-id="button-submit"]').should('exist')
      cy.get('[data-test-id="button-add"]').should('exist')
      cy.get('[data-test-id="button-delete"]').should('exist')
      cy.get('[data-test-id="button-undelete"]').should('not.exist')
    })

    it('should be able to edit a messaging queue', () => {
      cy.get('[data-test-id="input-name"]').type('Edited')
      cy.get('[data-test-id="input-consumer"]').select('Corteza')
      cy.get('[data-test-id="input-polling"]').clear().type('10s')
      cy.get('[data-test-id="button-submit"]').click()
      cy.get('[data-test-id="input-updated-at"]').should('exist')
    })

    it('should check whether the data is persisted', () => {
      cy.get('[data-test-id="input-name"]').should('have.value', 'TestQueueEdited')
      cy.get('[data-test-id="input-consumer"]').should('have.value', 'corteza')
      cy.get('[data-test-id="input-polling"]').should('have.value', '10s')
    })

    it('should be able to select between different consumers', () => {
      cy.get('[data-test-id="input-consumer"]').select('Eventbus')
      cy.get('[data-test-id="button-submit"]').click({ force: true })
      cy.get('[data-test-id="input-consumer"]').should('have.value', 'eventbus')

      cy.get('[data-test-id="input-consumer"]').select('Redis')
      cy.get('[data-test-id="button-submit"]').click({ force: true })
      cy.get('[data-test-id="input-consumer"]').should('have.value', 'redis')
    })
  })
})
