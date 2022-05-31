/// <reference types="cypress" />
const baseURL = Cypress.env("baseURL");
describe("Test for logging out the user", () => {
  context("Test for logging out the logged in user", () => {
    it("should be able to visit the login page", () => {
      cy.visit(baseURL + "/auth"); // When running this test make sure that the base url is set to localhost:3000
      cy.get('[data-test-id="input-email"]').type("cypress@test.com"); // Here write your email address for your account
      cy.get('[data-test-id="input-password"]').type("newcypress123"); // Write the password for your account
      cy.get('[data-test-id="button-login-and-remember"]').click(); // Here we click on the log in and remember me button
      cy.get('[data-test-id="link-logout"]').click(); // We click on the logout button
    });
  });
});
