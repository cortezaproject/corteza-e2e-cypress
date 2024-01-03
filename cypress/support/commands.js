import 'cypress-mailhog'

Cypress.Commands.add('login', ({ email, password, buttonLoginID = 'button-login-and-remember', url } = {}) => {
  if (url) {
    cy.visit(url + '/auth/login')
  }

  if (email) {
    cy.get('[data-test-id="input-email"]').type(email)
  }

  if (password) {
    cy.get('[data-test-id="input-password"]').type(password)
  }

  cy.get(`[data-test-id="${buttonLoginID}"]`).click()
})

Cypress.Commands.add('preTestLogin', ({ email = Cypress.env('USER_EMAIL'), password = Cypress.env('USER_PASSWORD'), url }) => {
  if (!window.sessionStorage.getItem('auth.refresh-token')) {
    cy.login({ email, password, url })
  }
})

// Wrapper for db seed, used only to use db DSN value
Cypress.Commands.add('seedDb', (list) => {
  cy.task('seedDb', { list, dbDsn: Cypress.env('PROVISION_DB_DSN') })
})
