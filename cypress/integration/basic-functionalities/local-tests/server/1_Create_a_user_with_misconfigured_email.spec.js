/// <reference types="cypress" />
const baseURL = Cypress.env("baseURL");
describe("Test for creating a user with misconfigured email", () => {
  context("Test for visiting the sign up page", () => {
    it("should be able to visit the sign up page", () => {
      cy.visit(baseURL + "/"); // When running this test make sure that the base url is set to localhost:3000
      cy.get('[data-test-id="link-signup"]').click(); // We click on create a new account button
    });
  });

  context("Test for entering the sign up information", () => {
    it("should not be able to create an account due to a misconfigured email", () => {
      cy.get('[data-test-id="input-email"]').type("cypress_email"); // THIS WILL BE LEFT LIKE THIS SO IT'S MISCONFIGURED AND WE RECEIVE AN ERROR/WARNING;  On "EMAIL" we type the email of the account that we want to create
      cy.get('[data-test-id="input-password"]').type("password"); // On "Password" we type the password that we want to use
      cy.get('[data-test-id="input-name"]').type("cypress account"); // We type the name of the account/user here
      cy.get('[data-test-id="input-handle"]').type("cypress_handle"); // We type the handle for the account
      cy.get('[data-test-id="button-submit"]').click(); // We click on the submit button
    });
  });
});
