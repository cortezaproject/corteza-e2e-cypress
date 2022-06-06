const baseURL = Cypress.env('baseURL')
const email = Cypress.env('user').email
const password = Cypress.env('user').password
const updatedPassword = Cypress.env('user').updatedPassword
// email and password should be declared in your local cypress.env.json file

Cypress.Commands.add('login', (changePassword) => {
  if (changePassword) {
    cy.visit(baseURL + '/auth') // When running this test make sure that the base url is set to localhost:3000
    cy.get('[data-test-id="input-password"]').type(updatedPassword)
  } else {
    cy.visit(baseURL + '/')
    cy.get('[data-test-id="input-password"]').type(password)
  }

  cy.get('[data-test-id="input-email"]').type(email)
  cy.get('[data-test-id="button-login-and-remember"]').click()
})
