/// <reference types="cypress" />
const adminURL = Cypress.env('ADMIN_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for action log details', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: adminURL })
    }
  })

  context('Test for action log details', () => {
    it('should have same info in results and in details', () => {
      cy.visit(adminURL + '/')
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      cy.get('.nav-sidebar').contains('Action log').click()
      // We wait 3s in order the page to be fully loaded
      cy.wait(3000)
      // We click on the first search result which should be the logging in action
      cy.get('tbody > tr:eq(0) > td:eq(1)').click({ force: true })
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)

      // We check the timestamp details
      // We take the timestamp value from search action
      cy.get('#resource-list > tbody > tr:eq(0) > .text-nowrap').invoke('text').as('time1')
      // We take the timestamp value from details
      cy.get('tbody > tr:eq(1) > td > .card-group > .card > .card-body > div > [data-test-id="details-timestamp"]').invoke('text').as('time2')
      cy.get('@time1').then(($t1) => {
        cy.get('@time2').then(($t2) => {
          cy.log($t1)
          cy.log($t2)
          expect($t1.trim()).to.eq($t2.trim())
        })
      })

      // We check the user details
      // We take the user value from search action
      cy.get('#resource-list > tbody > tr:eq(0) > td > [data-test-id="item-user-id"]').invoke('text').as('user1')
      // We take the user value from details
      cy.get('tbody > tr:eq(1) > td > .card-group > .card > .card-body > div > [data-test-id="details-user"]').invoke('text').as('user2')
      cy.get('@user1').then(($u1) => {
        cy.get('@user2').then(($u2) => {
          cy.log($u1)
          cy.log($u2)
          expect($u1.trim()).to.eq($u2.trim())
        })
      })

      // We check the origin details
      // We take the origin value from search action
      cy.get(' #resource-list > tbody > tr:eq(0) > td:eq(2)').invoke('text').as('origin1')
      // We take the origin value from details
      cy.get('tbody > tr:eq(1) > td > .card-group > .card > .card-body > div > [data-test-id="details-request-origin"]').invoke('text').as('origin2')
      cy.get('@origin1').then(($o1) => {
        cy.get('@origin2').then(($o2) => {
          cy.log($o1)
          cy.log($o2)
          expect($o1.trim()).to.eq($o2.trim())
        })
      })

      // We check the resource details
      // We take the resource value from search action
      cy.get('#resource-list > tbody > tr:eq(0) > td > [data-test-id="item-resource"]').invoke('text').as('resource1')
      // We take the resource value from details
      cy.get('tbody > tr:eq(1) > td > .card-group > .card > .card-body > div > [data-test-id="details-resource"]').invoke('text').as('resource2')
      cy.get('@resource1').then(($r1) => {
        cy.get('@resource2').then(($r2) => {
          cy.log($r1)
          cy.log($r2)
          expect($r1.trim()).to.eq($r2.trim())
        })
      })

      // We check the action details
      // We take the action value from search action
      cy.get('#resource-list > tbody > tr:eq(0) > td > [data-test-id="item-action"]').invoke('text').as('auth1')
      // We take the action value from details
      cy.get('tbody > tr:eq(1) > td > .card-group > .card > .card-body > div > [data-test-id="details-action"]').invoke('text').as('auth2')
      cy.get('@auth1').then(($a1) => {
        cy.get('@auth2').then(($a2) => {
          cy.log($a1)
          cy.log($a2)
          expect($a1.trim()).to.eq($a2.trim())
        })
      })

      // We check the description details
      // We take the description value from search action
      cy.get(' #resource-list > tbody > tr:eq(0) > td:eq(5)').invoke('text').as('description1')
      // We take the description value from details
      cy.get('tbody > tr:eq(1) > td > .card-group > .card:last > .card-body > .row:first > div:last').invoke('text').as('description2')
      cy.get('@description1').then(($d1) => {
        cy.get('@description2').then(($d2) => {
          cy.log($d1)
          cy.log($d2)
          expect($d1.trim()).to.eq($d2.trim())
        })
      })
    })
  })
})
