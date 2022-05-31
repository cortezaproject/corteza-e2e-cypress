/// <reference types="cypress" />
const baseURL = Cypress.env("baseURL");
describe("Test for logging in", () => {
  context("Test for logging in with the already created user", () => {
    it("should be able to log in successfully", () => {
      cy.visit(baseURL + "/"); // When running this test make sure that the base url is set to localhost:3000
      cy.get('[data-test-id="input-email"]').type("cypress@test.com"); // Here write your email address for your account
      cy.get('[data-test-id="input-password"]').type("cypress123"); // Write the password for your account
      cy.get('[data-test-id="button-login-and-remember"]').click(); // Here we click on the log in and remember me button
    });
  });
});
