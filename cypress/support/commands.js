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
