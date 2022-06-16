/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// Before running this test first sign up, create a namespace, module (also edit it), a record page and a record
describe('Test for editing a record', () => {
  before(() => {
    cy.login({ email, password })
  })

  context('Test for editing a record through the all records button', () => {
    it('should be able to edit the record by viewing it', () => {
      cy.get('[data-test-id="button-visit-namespace"]:last').click()
      cy.get('[data-test-id="button-admin"]').click()
      cy.get('[data-test-id="button-all-records"]').click()
      cy.get('table > tbody').find('tr:first').click()
      cy.get('[data-test-id="button-edit"]').click()
      cy.get('input:nth-child(1)').eq(0).clear().type('35')
      cy.get('input:nth-child(1)').eq(1).clear().type('Steve')
      cy.get('input:nth-child(1)').eq(2).clear().type('Taker')
      cy.get('[data-test-id="button-submit"]').click()
      cy.wait(500)
      cy.get('.card-body').contains('35').should('exist')
      cy.get('.card-body').contains('Steve').should('exist')
      cy.get('.card-body').contains('Taker').should('exist')
      cy.url().should('contain', '/record/')
    })

    it('should be able to edit the record by clicking on the edit button in the all records view', () => {
      cy.get('.nav-sidebar').contains('Modules').click()
      cy.get('[data-test-id="button-back-without-save"]').click()
      cy.get('[data-test-id="button-all-records"]').click()
      cy.get('table > tbody').find('tr:first').within(() => {
        cy.get('td').find('a').click()
      })
      cy.get('input:nth-child(1)').eq(0).clear().type('33')
      cy.get('input:nth-child(1)').eq(1).clear().type('Angela')
      cy.get('input:nth-child(1)').eq(2).clear().type('Fuller')
      cy.get('[data-test-id="button-submit"]').click()
      cy.wait(500)
      cy.get('.card-body').contains('33').should('exist')
      cy.get('.card-body').contains('Angela').should('exist')
      cy.get('.card-body').contains('Fuller').should('exist')
      cy.url().should('contain', '/record/')
    })
  })

  context('Test for cloning a record', () => {
    it('should be able to clone a record ', () => {
      cy.get('[data-test-id="button-clone"]').click()
      cy.get('input:nth-child(1)').eq(0).clear().type('31')
      cy.get('input:nth-child(1)').eq(1).clear().type('Bob')
      cy.get('input:nth-child(1)').eq(2).clear().type('Wiser')
      cy.get('[data-test-id="button-submit"]').click()
      cy.wait(500)
      cy.get('.card-body').contains('31').should('exist')
      cy.get('.card-body').contains('Bob').should('exist')
      cy.get('.card-body').contains('Wiser').should('exist')
      cy.url().should('contain', '/record/')
    })
  })

  context('Test for editing a record through the module all records button', () => {
    it('should be able to edit a record by clicking on it ', () => {
      cy.get('.nav-sidebar').contains('Modules').click()
      cy.get('.header-navigation').contains('All records').click()
      cy.get('table > tbody').find('tr:first').click()
      cy.get('[data-test-id="button-edit"]').click()
      cy.get('input:nth-child(1)').eq(0).clear().type('29')
      cy.get('input:nth-child(1)').eq(1).clear().type('Rick')
      cy.get('input:nth-child(1)').eq(2).clear().type('Morris')
      cy.get('[data-test-id="button-submit"]').click()
      cy.wait(500)
      cy.get('.card-body').contains('29').should('exist')
      cy.get('.card-body').contains('Rick').should('exist')
      cy.get('.card-body').contains('Morris').should('exist')
      cy.url().should('contain', '/record/')
    })

    it('should be able to edit a record by clicking on edit button ', () => {
      cy.get('.nav-sidebar').contains('Modules').click()
      cy.get('.header-navigation').contains('All records').click()
      cy.get('table > tbody').find('tr:first').within(() => {
        cy.get('td').find('a').click()
      })
      cy.get('input:nth-child(1)').eq(0).clear().type('38')
      cy.get('input:nth-child(1)').eq(1).clear().type('Jack')
      cy.get('input:nth-child(1)').eq(2).clear().type('Burner')
      cy.get('[data-test-id="button-submit"]').click()
      cy.wait(500)
      cy.get('.card-body').contains('38').should('exist')
      cy.get('.card-body').contains('Jack').should('exist')
      cy.get('.card-body').contains('Burner').should('exist')
      cy.url().should('contain', '/record/')
    })
  })

  context('Test for editing a record on a public page', () => {
    it('should be able to edit a record by clicking on it', () => {
      cy.get('[data-test-id="button-public"]').click()
      cy.get('table > tbody').find('tr:first').click()
      cy.get('[data-test-id="button-edit"]').click()
      cy.get('input:nth-child(1)').eq(0).clear().type('21')
      cy.get('input:nth-child(1)').eq(1).clear().type('Nill')
      cy.get('input:nth-child(1)').eq(2).clear().type('Harris')
      cy.get('[data-test-id="button-submit"]').click()
      cy.wait(500)
      cy.get('.card-body').contains('21').should('exist')
      cy.get('.card-body').contains('Nill').should('exist')
      cy.get('.card-body').contains('Harris').should('exist')
      cy.url().should('contain', '/record/')
    })

    it('should be able to edit a record by clicking on edit button ', () => {
      cy.get('.nav-sidebar').contains("Cypress page").click()
      cy.get('table > tbody').find('tr:first').within(() => {
        cy.get('td').find('a').click()
      })
      cy.get('input:nth-child(1)').eq(0).clear().type('19')
      cy.get('input:nth-child(1)').eq(1).clear().type('Philip')
      cy.get('input:nth-child(1)').eq(2).clear().type('Van')
      cy.get('[data-test-id="button-submit"]').click()
      cy.wait(500)
      cy.get('.card-body').contains('19').should('exist')
      cy.get('.card-body').contains('Philip').should('exist')
      cy.get('.card-body').contains('Van').should('exist')
      cy.url().should('contain', '/record/')
    })
  })
})
