/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

it('should be able to visit the login page', () => {
  cy.visit(baseURL + '/') // When running this test make sure that the base url is set to localhost:3000
}) 

it('should be able to click on the create a new account button and go to the signup page', () => {
  cy.get('[data-test-id="link-signup"]').click() // here we click on the create a new account button and we are redirected to the signup page
})

it('should be able to write signup credentials, create an account and log in', () => {
  cy.get('[data-test-id="input-email"]').type("cypress_email") // THIS WILL BE LEFT LIKE THIS SO IT'S MISCONFIGURED AND WE RECEIVE AN ERROR/WARNING;  On "EMAIL" we type the email of the account that we want to create
  cy.get('[data-test-id="input-password"]').type("password") // On "Password" we type the password that we want to use 
  cy.get('[data-test-id="input-name"]').type("cypress account") // We type the name of the account/user here
  cy.get('[data-test-id="input-handle"]').type("cypress_handle") // We type the handle for the account
  cy.get('[data-test-id="button-submit"]').click() // we click on the submit button
})