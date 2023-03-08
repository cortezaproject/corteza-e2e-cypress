/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const password = Cypress.env('USER_PASSWORD')

describe('Test for editing a record', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })

  context('Test for editing a record through the all records button', () => {
    it('should be able to edit the record by viewing it', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]').type('cypress')
      cy.get('[data-test-id="link-visit-namespace-cypress_namespace"]').click({ force: true })
      cy.get('[data-test-id="button-admin"]', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-all-records"]', { timeout: 10000 }).click()
      cy.get('table > tbody', { timeout: 10000 }).find('tr:first').click()
      cy.get('[data-test-id="button-edit"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('input:nth-child(1)', { timeout: 10000 }).eq(1).clear().type('35')
      cy.get('input:nth-child(1)').eq(2).clear().type('Steve')
      cy.get('input:nth-child(1)').eq(3).clear().type('Taker')
      cy.get('[data-test-id="button-save"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.card-body', { timeout: 10000 }).contains('35').should('exist')
      cy.get('.card-body').contains('Steve').should('exist')
      cy.get('.card-body').contains('Taker').should('exist')
      cy.url().should('contain', '/record/')
    })

    it('should be able to edit the record by clicking on the edit button in the all records view', () => {
      cy.get('.nav-sidebar').contains('Modules').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('[data-test-id="button-back-without-save"]', { timeout: 10000 }).click()
      cy.get('[data-test-id="button-all-records"]').click()
      cy.get('table > tbody').find('tr:first').within(() => {
        cy.get('td').find('a:eq(1)').click()
      })
      cy.get('input:nth-child(1):eq(1)').clear().type('33')
      cy.get('input:nth-child(1):eq(2)').clear().type('Angela')
      cy.get('input:nth-child(1):eq(3)').clear().type('Fuller')
      cy.get('[data-test-id="button-save"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.card-body', { timeout: 10000 }).contains('33').should('exist')
      cy.get('.card-body').contains('Angela').should('exist')
      cy.get('.card-body').contains('Fuller').should('exist')
      cy.url().should('contain', '/record/')
    })
  })

  context('Test for cloning a record', () => {
    it('should be able to clone a record ', () => {
      cy.get('[data-test-id="button-clone"]').click()
      cy.get('input:nth-child(1)').eq(1).clear().type('31')
      cy.get('input:nth-child(1)').eq(2).clear().type('Bob')
      cy.get('input:nth-child(1)').eq(3).clear().type('Wiser')
      cy.get('[data-test-id="button-save"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.card-body', { timeout: 10000 }).contains('31').should('exist')
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
      cy.get('input:nth-child(1):eq(1)').clear().type('29')
      cy.get('input:nth-child(1):eq(2)').clear().type('Rick')
      cy.get('input:nth-child(1):eq(3)').clear().type('Morris')
      cy.get('[data-test-id="button-save"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.card-body', { timeout: 10000 }).contains('29').should('exist')
      cy.get('.card-body').contains('Rick').should('exist')
      cy.get('.card-body').contains('Morris').should('exist')
      cy.url().should('contain', '/record/')
    })

    it('should be able to edit a record by clicking on edit button ', () => {
      cy.get('.nav-sidebar').contains('Modules').click()
      cy.get('.header-navigation').contains('All records').click()
      cy.get('table > tbody').find('tr:first').within(() => {
        cy.get('td').find('a:eq(1)').click()
      })
      cy.get('input:nth-child(1):eq(1)').clear().type('38')
      cy.get('input:nth-child(1):eq(2)').clear().type('Jack')
      cy.get('input:nth-child(1):eq(3)').clear().type('Burner')
      cy.get('[data-test-id="button-save"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.card-body', { timeout: 10000 }).contains('38').should('exist')
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
      cy.get('input:nth-child(1):eq(1)').clear().type('21')
      cy.get('input:nth-child(1):eq(2)').clear().type('Nill')
      cy.get('input:nth-child(1):eq(3)').clear().type('Harris')
      cy.get('[data-test-id="button-save"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.card-body', { timeout: 10000 }).contains('21').should('exist')
      cy.get('.card-body').contains('Nill').should('exist')
      cy.get('.card-body').contains('Harris').should('exist')
      cy.url().should('contain', '/record/')
    })

    it('should be able to edit a record by clicking on edit button ', () => {
      cy.get('.nav-sidebar').contains("Cypress page").click()
      cy.get('table > tbody').find('tr:first').within(() => {
        cy.get('td').find('a').click()
      })
      cy.get('input:nth-child(1):eq(1)').clear().type('19')
      cy.get('input:nth-child(1):eq(2)').clear().type('Philip')
      cy.get('input:nth-child(1):eq(3)').clear().type('Van')
      cy.get('[data-test-id="button-save"]').click()
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.card-body', { timeout: 10000 }).contains('19').should('exist')
      cy.get('.card-body').contains('Philip').should('exist')
      cy.get('.card-body').contains('Van').should('exist')
      cy.url().should('contain', '/record/')
    })
  })
})
