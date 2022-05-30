/// <reference types="cypress" />
const baseURL = Cypress.env("baseURL");
// Before running this test first run the Server test 2 in order to create a user so you can log in.
describe("Test avatar functionalities", () => {
  context("Test for logging in the user", () => {
    it("should be able to log in successfully", () => {
      cy.visit(baseURL + "/"); // Localhost in the env file should be changed to reflect the Reporter host. We are visiting the main authentication page here.
      cy.get('[data-test-id="input-email"]').type("cypress@test.com"); // Here write your email address for your account
      cy.get('[data-test-id="input-password"]').type("cypress123"); // Write the password for your account
      cy.get('[data-test-id="button-login-and-remember"]').click(); // Here we click on the log in and remember me button
      cy.visit(baseURL + "/list"); // Visiting main page of Reporter
    });
  });

  context("Test for checking which user is logged in", () => {
    it("should be able to see which user is logged in", () => {
      cy.get('[data-test-id="dropdown-profile"]').click(); // We click on the profile (avatar) icon and can see which user is logged in
    });
  });

  context("Test for redirecting the user to the auth page", () => {
    it("should be able to click on the profile button and be redirected to the auth page", () => {
      cy.get('[data-test-id="dropdown-profile-user"]').click(); // We click on the profile button
    });
  });

  context("Test for redirecting the user to change password auth page", () => {
    it("should be able to click on the change password button and be redirected to the auth page", () => {
      cy.get('[data-test-id="dropdown-profile-change-password"]').click({ force: true }); // We click on change password button
    });
  });

  context("Test for logging out the user", () => {
    it("should be able to log out", () => {
      cy.get('[data-test-id="dropdown-profile-logout"]').click({ force: true }); // We click on the log out button
    });
  });
});
