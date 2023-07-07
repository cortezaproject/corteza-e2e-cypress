/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for creating a messaging queue', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    } else {
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for creating a messaging queue', () => {
    it('should check whether the correct buttons and states are shown', () => {
      cy.intercept('/api/system/stats/').as('load')
      cy.intercept('/api/system/queues/?query=&limit=100&incTotal=true&sort=createdAt+DESC&deleted=0').as('message-queues')
      cy.visit(adminURL + '/')
      cy.wait('@load')
      cy.get('.nav-sidebar').find('a[href="/system/queue"]').click({ force: true })
      cy.wait('@message-queues')
      cy.get('[data-test-id="button-add"]').click()
      cy.get('[data-test-id="button-delete"]').should('not.exist')
      cy.get('[data-test-id="button-undelete"]').should('not.exist')
      cy.get('[data-test-id="button-submit"].disabled').should('exist')
      cy.get('[data-test-id="button-add"]').should('not.exist')
      cy.get('[data-test-id="input-created-at"]').should('not.exist')
      cy.get('[data-test-id="input-updated-at"]').should('not.exist')
      cy.get('[data-test-id="input-deleted-at"]').should('not.exist')
    })

    it('should not be able to create a messaging queue with a misconfigured field', () => {
      cy.get('[data-test-id="input-name"]').type('123')
      // We checked if the field is red/invalid
      cy.get('[data-test-id="input-name"].is-invalid').should('exist')
      cy.get('[data-test-id="button-submit"].disabled').should('exist')
      cy.get('[data-test-id="input-name"]').clear().type('Test')
      cy.get('[data-test-id="input-consumer"]').select('Store')
      cy.get('[data-test-id="input-polling"]').type('5')
      // We checked if the field is red/invalid
      cy.get('[data-test-id="input-polling"].is-invalid').should('exist')
      cy.get('[data-test-id="button-submit"].disabled').should('exist')
    })

    it('should be able to create a messaging queue', () => {
      cy.get('[data-test-id="input-name"]').clear().type('TestQueue')
      cy.get('[data-test-id="input-consumer"]').select('Store')
      cy.get('[data-test-id="input-polling"]').clear().type('5s')
      cy.get('[data-test-id="button-submit"]').click()
      cy.get('[data-test-id="input-created-at"]').should('exist')
    })

    it('should check whether the data is persisted', () => {
      cy.get('[data-test-id="input-name"]').should('have.value', 'TestQueue')
      cy.get('[data-test-id="input-consumer"]').should('have.value', 'store')
      cy.get('[data-test-id="input-polling"]').should('have.value', '5s')
    })
  })
})
