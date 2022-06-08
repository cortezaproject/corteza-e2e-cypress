const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password

// email and password should be declared in your local cypress.env.json file
Cypress.Commands.add('login', ({ email, password, buttonLoginID = 'button-login-and-remember' } = {}) => {
  cy.visit(baseURL + '/auth/login')

  if (email) {
    cy.get('[data-test-id="input-email"]').type(email)
  }

  if (password) {
    cy.get('[data-test-id="input-password"]').type(password)
  }

  cy.get(`[data-test-id="${buttonLoginID}"]`).click()
})
