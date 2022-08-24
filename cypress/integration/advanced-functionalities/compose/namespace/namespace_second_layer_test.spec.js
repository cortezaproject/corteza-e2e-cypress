/// <reference types="cypress" />
const composeURL = Cypress.env('webappLink').composeURL
const email = Cypress.env('user').email
const newEmail = Cypress.env('user').newEmail
const password = Cypress.env('user').password
const newPassword = Cypress.env('user').newPassword

describe('Testing second layer of namespace', () => {
  before(() => {
    if (!window.sessionStorage.getItem('auth.refresh-token')) {
      cy.login({ email, password, webappLink: composeURL })
    }
  })
  //We need to create a namespace so we can have data to work with
  context('Test for creating a namespace', () => {
    it('should be able to create a namespace', () => {
      cy.visit(composeURL + '/namespaces')
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

  //These tests are passing (we just need to figure out how to visit ONE so we can check if the app was enabled there)
  context('Test for checking the enable namespace checkbox', () => {
    it('should be able to uncheck the checkbox and NS to be disabled', () => {
      cy.get('[data-test-id="button-edit-namespace"]:last').click()
      cy.get('[data-test-id="checkbox-enable-namespace"]').uncheck({ force: true })
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('not.be.checked')
      cy.get('[data-test-id="button-save-and-close"]').click()
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      cy.get('[data-test-id="button-visit-namespace"]').should('not.exist')
    })

    it('should be able to check the checkbox and NS to be enabled', () => {
      cy.get('[data-test-id="button-edit-namespace"]').click()
      cy.get('[data-test-id="checkbox-enable-namespace"]').check({ force: true })
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('be.checked')
      cy.get('[data-test-id="button-save-and-close"]').click()
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      cy.get('[data-test-id="button-visit-namespace"]').should('exist')
    })
  })

  context('Test for checking the show logo checkbox', () => {
    it('should be able to enable the show logo checkbox and view the pre-used logo', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      cy.get('[data-test-id="button-edit-namespace"]').click()
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
    })

    it('should be able reset the logo', () => {
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      cy.get('[data-test-id="button-edit-namespace"]').click()
      cy.get('[data-test-id="button-logo-reset"]').click()
      cy.get('[data-test-id="file-logo-upload"]').should('not.have.value', 'yin_yang.png')
      cy.get('[data-test-id="checkbox-show-logo"]').uncheck({ force: true })
      // We wait for 1s in order the checkbox to be marked
      cy.wait(1000)
      cy.get('[data-test-id="button-save-and-close"]').click()
    })
  })

  context('Test for checking the enable on application list checkbox', () => {
    it('should be able to check the checkbox and NS to be enabled on application list', () => {
      cy.visit(composeURL + '/namespaces')
      // Here we also test the search bar
      cy.get('[data-test-id="input-search"]').type('Cypress namespace')
      cy.get('[data-test-id="button-edit-namespace"]').click()
      cy.get('[data-test-id="checkbox-toggle-application"]').check({ force: true })
      cy.get('[data-test-id="checkbox-enable-namespace"]').should('be.checked')
      // We wait for 2s in order the checkbox to be marked
      cy.wait(2000)
      cy.get('[data-test-id="button-save"]').click()
      cy.get('[data-test-id="button-save-and-close"]').click()
    })
  })

  context('Testing import namespace functionality', () => {
    it('should be able to import a namespace', () => {
      cy.visit(composeURL + '/namespaces')
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
      cy.get('[data-test-id="button-edit-namespace"]').click()
      // We wait 1s in order all the settings to be loaded
      cy.wait(1000)
      cy.get('.header').within(() => {
        cy.get('[data-test-id="button-translation"]').click()
      })
      cy.get('[data-test-id="dropdown-add-language"]').click()
      cy.get('[data-test-id="dropdown-language-item-Slovenian"]').click()
      cy.get('[data-test-id="translation-value-Name-language-Slovenian"]').type('Slovenian name translation')
      cy.get('[data-test-id="button-submit"]').click()
      // We check if the success toast appears
      cy.get('.b-toast-success')
      cy.get('.header').within(() => {
        cy.get('[data-test-id="button-translation"]').click()
      })
      cy.get('[data-test-id="translation-value-Name-language-Slovenian"]').should('exist', 'Slovenian name translation')
    })

    it('should be able to delete a translation', () => {
      cy.get('[data-test-id="translation-value-Name-language-Slovenian"]').clear()
      cy.get('[data-test-id="button-submit"]').click({ force: true })
      // We check if the success toast appears
      cy.get('.b-toast-success')
      cy.get('.header').within(() => {
        cy.get('[data-test-id="button-translation"]').click()
      })
      cy.get('[data-test-id="translation-value-Name-language-Slovenian"]').should('not.exist', 'Slovenian name translation')
    })
  })

  context('Testing permissions', () => {
    it('should be able to log in with the other account and check if permissions were applied', () => {
      cy.visit(composeURL + '/namespaces')
      cy.get('[data-test-id="button-permissions"]').click()
      cy.get('.list-group').contains('Test').click()
      // We select Deny for delete any namepsace permission
      cy.get('.modal-content > .modal-body > form > div > .rule-list > .container > :nth-child(3)').contains('Deny').click()
      cy.get('[data-test-id="button-save"]').click({ force: true })
      cy.get('.close').click()
      cy.get('[data-test-id="dropdown-profile"]').click()
      cy.get('[data-test-id="dropdown-profile-logout"]').click()
      cy.get('[data-test-id="link-login"]').click()
      cy.get('[data-test-id="input-email"]').type(newEmail)
      cy.get('[data-test-id="input-password"]').type(newPassword)
      cy.get('[data-test-id="button-login-and-remember"]').click()
      // We check with this that the edit button is missing, hence the profile doesn't have permissions
      cy.get('[data-test-id="button-edit-namespace"]').should('not.exist')
    })
  })

  // // When you export a NS, you are kicked out of cypress and the application is closed
  // context('Testing export namespace functionality', () => {
  //   it('should be able to export a namespace', () => {
  //     cy.visit(composeURL + '/namespaces')
  //     // Here we also test the search bar
  //     cy.get('[data-test-id="input-search"]').type('Cypress namespace')
  //     cy.get('[data-test-id="button-edit-namespace"]').click()
  //     cy.get('[data-test-id="button-export-namespace"]').click()
  //   })
  // })
})
