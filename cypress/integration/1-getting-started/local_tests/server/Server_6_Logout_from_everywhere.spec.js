/// <reference types="cypress" />
const baseURL = Cypress.env("baseURL");

it("should be able to visit the login page", () => {
  cy.visit(baseURL + "/"); // When running this test make sure that the base url is set to localhost:3000
});

it("should be able to login and go to login sessions tab and use the log out from everywhere feature ", () => {
  cy.get('[data-test-id="input-email"]').type("cypress@test.com"); // Here write your email address for your account
  cy.get('[data-test-id="input-password"]').type("newcypress123"); // Write the password for your account
  cy.get('[data-test-id="button-login-and-remember"]').click(); // Here we click on the log in and remember me button
  cy.get('[data-test-id="link-tab-login-session"]').click(); // We click on log in sessions tab
  cy.get('[data-test-id="button-logout-from-everywhere"]').click(); // We click on log our from everywhere button
});
