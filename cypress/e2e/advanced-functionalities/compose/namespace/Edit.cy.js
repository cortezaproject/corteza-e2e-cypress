/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Testing second layer of namespace', () => {
  // We need to create a namespace so we can have data to work with
  context('Test for creating a namespace', () => {
    it('should be able to create a namespace', () => {
      cy.intercept('/api/compose/namespace/').as('namespace-list')
      cy.visit(composeURL + '/namespaces')
      cy.wait('@namespace-list')
      cy.get('[data-test-id="dropdown-profile"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="dropdown-profile-logout"]', { timeout: 10000 }).click({ force: true })
      cy.login({ email, password, url: composeURL })
      cy.get('[data-test-id="button-manage-namespaces"]').click({ force: true })
      cy.get('[data-test-id="button-create"]').click({ force: true })
      cy.get('[data-test-id="input-name"]').type('Cypress namespace')
      cy.get('[data-test-id="input-slug"]').type('cypress_namespace')
      cy.get('[data-test-id="input-subtitle"]').type('Testing namespace')
      cy.get('[data-test-id="input-description"]').type('This is the description of the namespace')
      cy.get('[data-test-id="button-save"]', { timeout: 10000 }).click({ force: true })
    })
  })

  context('Testing the enable namespace checkbox functionality', () => {
    it('should be able to disable the namespace', () => {
      cy.get('[data-test-id="checkbox-enable-namespace"]', { timeout: 10000 }).uncheck({ force: true })
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('not.be.checked')
    })

    it('should be able to enable the namespace', () => {
      cy.get('[data-test-id="checkbox-enable-namespace"]').check({ force: true })
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('[data-test-id="button-visit-namespace"]', { timeout: 10000 }).should('exist')
    })
  })

  context('Test for checking the show logo checkbox', () => {
    it('should be able to enable the show logo checkbox and view the pre-used logo', () => {
      cy.intercept('/api/compose/namespace/').as('namespace-list')
      cy.intercept('/api/compose/namespace/?query=Cypress+namespace&limit=100&incTotal=true&pageCursor=&sort=name+ASC').as('ns-search')
      cy.intercept('/api/compose/namespace/?query=&limit=100&incTotal=true&sort=name+ASC').as('ns-manage')
      cy.visit(composeURL + '/namespaces')
      cy.wait('@namespace-list')
      cy.get('[data-test-id="button-manage-namespaces"]').click({ force: true })
      cy.wait('@ns-manage')
      cy.get('[data-test-id="input-search"]').clear().type('Cypress namespace')
      cy.wait('@ns-search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="checkbox-show-logo"]').check({ force: true })
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('[data-test-id="button-logo-preview"]').click({ force: true })
      // We check if the logo is displayed
      cy.get('.modal-body > img').should('exist')
      // We press on Escape button in order to close the logo preview
      cy.get('body').trigger('keydown', { keyCode: 27 })
    })

    it('should be able to import a logo', () => {
      cy.get('[data-test-id="file-logo-upload"]', { timeout: 10000 }).selectFile('cypress/fixtures/images/yin_yang.png', { force: true })
      cy.get('[data-test-id="file-logo-upload"]', { timeout: 10000 }).should('exist', 'yin_yang.png')
      cy.get('[data-test-id="button-save"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="button-logo-reset"]', { timeout: 10000 }).should('exist')
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]', { timeout: 10000 }).clear().type('Cypress namespace')
      cy.get('.circled-avatar', { timeout: 10000 }).should('exist')
    })

    it('should be able to reset the logo', () => {
      cy.intercept('/api/compose/namespace/?query=Cypress+namespace&limit=100&incTotal=true&pageCursor=&sort=name+ASC').as('ns-search')
      cy.intercept('/api/compose/namespace/?query=&limit=100&incTotal=true&sort=name+ASC').as('ns-manage')
      cy.get('[data-test-id="button-manage-namespaces"]', { timeout: 10000 }).click({ force: true })
      cy.wait('@ns-manage')
      cy.get('[data-test-id="input-search"]', { timeout: 10000 }).type('Cypress namespace', { timeout: 10000 }).should('exist')
      cy.wait('@ns-search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="button-logo-reset"]', { timeout: 10000 }).click({ force: true })
      cy.get('[data-test-id="file-logo-upload"]').should('not.have.value', 'yin_yang.png')
      cy.get('[data-test-id="checkbox-show-logo"]').uncheck({ force: true })
      cy.get('[data-test-id="checkbox-show-logo"]').should('not.be.checked')
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]', { timeout: 10000 }).should('exist').clear().type('Cypress namespace')
      cy.get('.circled-avatar > .ns-initial').should('exist')
    })
  })

  context('Test for checking the enable on application list checkbox', () => {
    it('should be able to check the checkbox and NS to be enabled on application list', () => {
      cy.intercept('/api/compose/namespace/').as('namespace-list')
      cy.intercept('/api/compose/namespace/?query=Cypress+namespace&limit=100&incTotal=true&pageCursor=&sort=name+ASC').as('ns-search')
      cy.intercept('/api/compose/namespace/?query=&limit=100&incTotal=true&sort=name+ASC').as('ns-manage')
      cy.visit(composeURL + '/namespaces')
      cy.wait('@namespace-list')
      cy.get('[data-test-id="button-manage-namespaces"]', { timeout: 10000 }).should('exist').click({ force: true })
      cy.wait('@ns-manage')
      cy.get('[data-test-id="input-search"]', { timeout: 10000 })
        .clear()
        .type('Cypress namespace')
      cy.wait('@ns-search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="checkbox-toggle-application"]').check({ force: true })
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('be.checked')
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('[data-test-id="button-save-and-close"]').click({ force: true })
    })
  })

  context('Testing import namespace functionality', () => {
    it('should be able to import a namespace', () => {
      cy.intercept('/api/compose/namespace/').as('namespace-list')
      cy.intercept('/api/compose/namespace/?query=&limit=100&incTotal=true&sort=name+ASC').as('ns-manage')
      cy.visit(composeURL + '/namespaces')
      cy.wait('@namespace-list')
      cy.get('[data-test-id="button-manage-namespaces"]').click({ force: true })
      cy.wait('@ns-manage')
      cy.get('[data-test-id="button-import"]')
        .click({ force: true })
        .get('#dropzone')
        .selectFile('cypress/fixtures/files/test.zip', { action: 'drag-drop', force: true })
      cy.get('[data-test-id="input-name"]').type('Test')
      cy.get('[data-test-id="input-handle"]').type('Test')
      cy.get('.modal [data-test-id="button-import"]').click({ force: true })
    })
  })

  context('Testing translations', () => {
    it('should be able to enter translations for another language', () => {
      cy.intercept('/api/compose/namespace/?query=Cypress+namespace&limit=100&incTotal=true&pageCursor=&sort=name+ASC').as('ns-search')
      cy.get('[data-test-id="input-search"]', { timeout: 10000 }).clear().type('Cypress namespace')
      cy.wait('@ns-search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('.header-navigation [data-test-id="button-translation"]').click({ force: true })
      cy.get('[data-test-id="dropdown-add-language"]').click({ force: true })
      cy.get('[data-test-id="dropdown-language-item-Slovenian"]').click({ force: true })
      cy.get('[data-test-id="translation-value-Name-language-slovenščina"]')
        .type('Slovenian name translation')
      cy.get('[data-test-id="button-submit"]').click({ force: true })
      cy.get('.header-navigation [data-test-id="button-translation"]').click({ force: true })
      cy.get('[data-test-id="translation-value-Name-language-slovenščina"]')
        .should('exist', 'Slovenian name translation')
    })

    it('should be able to delete a translation', () => {
      cy.get('.header-navigation [data-test-id="button-translation"]').click({ force: true })
      cy.get('[data-test-id="translation-value-Name-language-slovenščina"]', { timeout: 10000 }).should('exist').clear()
      cy.get('[data-test-id="button-submit"]').click({ force: true })
      cy.get('.header-navigation [data-test-id="button-translation"]').click({ force: true })
      cy.get('[data-test-id="translation-value-Name-language-slovenščina"]', { timeout: 10000 })
        .should('not.exist', 'Slovenian name translation')
    })
  })

  context('Testing export namespace functionality', () => {
    it('should be able to export a namespace', () => {
      cy.intercept('/api/compose/namespace/').as('namespace-list')
      cy.intercept('/api/compose/namespace/?query=Cypress+namespace&limit=100&incTotal=true&pageCursor=&sort=name+ASC').as('ns-search')
      cy.intercept('/api/compose/namespace/?query=&limit=100&incTotal=true&sort=name+ASC').as('ns-manage')
      cy.visit(composeURL + '/namespaces')
      cy.wait('@namespace-list')
      cy.get('[data-test-id="button-manage-namespaces"]', { timeout: 10000 })
        .should('exist')
        .click({ force: true })
      cy.wait('@ns-manage')
      cy.get('[data-test-id="input-search"]', { timeout: 10000 })
          .should('exist')
          .should('not.be', 'disabled')
          .clear()
          .type('Cypress namespace')
      cy.wait('@ns-search')
      cy.get('#resource-list td:nth-child(2)', { timeout: 10000 }).should('exist').click({ force: true })
      cy.get('[data-test-id="button-export-namespace"]').click({ force: true })
    })

    it('should be able to verify if the namespace was downloaded', () => {
      cy.readFile('cypress/downloads/Cypress namespace.zip').should('exist')
    })
  })
})
