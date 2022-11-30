/// <reference types="cypress" />
const composeURL = Cypress.env('COMPOSE_URL')
const email = Cypress.env('USER_EMAIL')
const newEmail = Cypress.env('USER_EMAIL_NEW')
const password = Cypress.env('USER_PASSWORD')
const newPassword = Cypress.env('USER_PASSWORD_NEW')

describe('Testing second layer of namespace', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, url: composeURL })
    }
  })
  // We need to create a namespace so we can have data to work with
  context('Test for creating a namespace', () => {
    it('should be able to create a namespace', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="button-create"]').click()
      cy.get('[data-test-id="input-name"]').type('Cypress namespace')
      cy.get('[data-test-id="input-slug"]').type('cypress_namespace')
      cy.get('[data-test-id="input-subtitle"]').type('Testing namespace')
      cy.get('[data-test-id="input-description"]').type('This is the description of the namespace')
      cy.get('[data-test-id="button-save-and-close"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success')
    })
  })

  context('Testing the enable namespace checkbox functionality', () => {
    it('should be able to uncheck the checkbox and NS to be disabled', () => {
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('tbody').click()
      cy.get('[data-test-id="checkbox-enable-namespace"]').uncheck({ force: true })
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('not.be.checked')
      cy.get('[data-test-id="button-save-and-close"]').click()
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('tbody').click()
      cy.get('[data-test-id="button-visit-namespace"].disabled').should('exist')
    })

    it('should be able to check the checkbox and NS to be enabled', () => {
      cy.get('[data-test-id="checkbox-enable-namespace"]').check({ force: true })
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('be.checked')
      cy.get('[data-test-id="button-save-and-close"]').click()
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('tbody').click()
      cy.get('[data-test-id="button-visit-namespace"]').should('exist')
    })
  })

  context('Test for checking the show logo checkbox', () => {
    it('should be able to enable the show logo checkbox and view the pre-used logo', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('tbody').click()
      cy.get('[data-test-id="checkbox-show-logo"]').check({ force: true })
      cy.get('[data-test-id="button-logo-preview"]').click()
      // We check if the logo is displayed
      cy.get('.modal-body > img').should('exist')
      // We press on Escape button in order to close the logo preview
      cy.get('body').trigger('keydown', { keyCode: 27 })
    })

    it('should be able to import a logo', () => {
      cy.get('[data-test-id="file-logo-upload"]').selectFile('cypress/fixtures/images/yin_yang.png', { force: true })
      cy.get('[data-test-id="file-logo-upload"]').should('exist', 'yin_yang.png')
      cy.get('[data-test-id="button-save-and-close"]').click()
      cy.get('[data-test-id="button-namespace-list"]').click()
      cy.get('[data-test-id="input-search"]').clear().type('Cypress namespace')
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.circled-avatar').should('exist')
    })

    it('should be able to reset the logo', () => {
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('tbody').click()
      cy.get('[data-test-id="button-logo-reset"]').click()
      cy.get('[data-test-id="file-logo-upload"]').should('not.have.value', 'yin_yang.png')
      cy.get('[data-test-id="checkbox-show-logo"]').uncheck({ force: true })
      cy.get('[data-test-id="checkbox-show-logo"]').should('not.be.checked')
      // We wait 1s so the checkbox data is fetched
      cy.wait(1000)
      cy.get('[data-test-id="button-save-and-close"]').click()
      cy.get('[data-test-id="button-namespace-list"]').click()
      cy.get('[data-test-id="input-search"]').clear().type('Cypress namespace')
      // We wait 1s in order the page to be fully loaded
      cy.wait(1000)
      cy.get('.circled-avatar > .ns-initial').should('exist')
    })
  })

  context('Test for checking the enable on application list checkbox', () => {
    it('should be able to check the checkbox and NS to be enabled on application list', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      // We wait 1s in order all the settings to be loaded
      cy.wait(1000)
      cy.get('tbody').click()
      cy.get('[data-test-id="checkbox-toggle-application"]').check({ force: true })
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('be.checked')
      // We wait 2s so the checkbox data is fetched
      cy.wait(2000)
      cy.get('[data-test-id="button-save"]').click()
      cy.get('[data-test-id="button-save-and-close"]').click()
    })
  })

  context('Testing import namespace functionality', () => {
    it('should be able to import a namespace', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="button-import"]').click().get('#dropzone').selectFile('cypress/fixtures/files/test.zip', { action: 'drag-drop', force: true })
      cy.get('[data-test-id="input-name"]').type('Test')
      cy.get('[data-test-id="input-handle"]').type('Test')
      cy.get('.card-footer').within(() => {
        cy.get('[data-test-id="button-import"]').click()
      })
      // We check if the success toast appears
      cy.get('.b-toast-success')
    })
  })

  context('Testing translations', () => {
    it('should be able to enter translations for another language', () => {
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      // We wait 1s in order all the settings to be loaded
      cy.wait(1000)
      cy.get('tbody').click()
      // We wait 1s in order all the settings to be loaded
      cy.wait(1000)
      cy.get('.header-navigation').within(() => {
        cy.get('[data-test-id="button-translation"]').click()
      })
      cy.get('[data-test-id="dropdown-add-language"]').click()
      cy.get('[data-test-id="dropdown-language-item-Slovenian"]').click()
      cy.get('[data-test-id="translation-value-Name-language-slovenščina"]').type('Slovenian name translation')
      cy.get('[data-test-id="button-submit"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success')
      cy.get('.header-navigation').within(() => {
        cy.get('[data-test-id="button-translation"]').click()
      })
      cy.get('[data-test-id="translation-value-Name-language-slovenščina"]').should('exist', 'Slovenian name translation')
    })

    it('should be able to delete a translation', () => {
      cy.get('[data-test-id="translation-value-Name-language-slovenščina"]').clear()
      cy.get('[data-test-id="button-submit"]').click({ force: true })
      // We check if the success toast appears
      cy.get('.b-toast-success')
      cy.get('.header-navigation').within(() => {
        cy.get('[data-test-id="button-translation"]').click()
      })
      cy.get('[data-test-id="translation-value-Name-language-slovenščina"]').should('not.exist', 'Slovenian name translation')
    })
  })

  context('Testing export namespace functionality', () => {
    it('should be able to export a namespace', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-manage-namespaces"]').click()
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      // We wait 1s in order all the settings to be loaded
      cy.wait(1000)
      cy.get('tbody').click()
      cy.get('[data-test-id="button-export-namespace"]').click()
    })

    it('should be able to verify if the namespace was downloaded', () => {
      cy.readFile('cypress/downloads/Cypress namespace.zip').should('exist')
    })
  })
})
