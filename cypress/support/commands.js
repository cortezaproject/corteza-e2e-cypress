const baseURL = Cypress.env('webappLink').baseURL
const adminURL = Cypress.env('webappLink').adminURL
const composeURL = Cypress.env('webappLink').composeURL
const workflowURL = Cypress.env('webappLink').workflowURL
const reporterURL = Cypress.env('webappLink').reporterURL
const oneURL = Cypress.env('webappLink').oneURL
const email = Cypress.env('user').email
const password = Cypress.env('user').password

Cypress.Commands.add('login', ({ email, password, buttonLoginID = 'button-login-and-remember', webappLink } = {}) => {
  if (webappLink) {
    cy.visit(webappLink + '/auth/login')
  } 
  
  else {
    cy.visit(baseURL + '/auth/login')
  }

  if (email) {
    cy.get('[data-test-id="input-email"]').type(email)
  }

  if (password) {
    cy.get('[data-test-id="input-password"]').type(password)
  }

  cy.get(`[data-test-id="${buttonLoginID}"]`).click()
})
