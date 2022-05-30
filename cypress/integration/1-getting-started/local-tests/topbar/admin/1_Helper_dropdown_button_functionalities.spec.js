/// <reference types="cypress" />
const baseURL = Cypress.env("baseURL");
// Before running this test first run the Server test 2 in order to create a user so you can log in.
describe("Test helper dropdown functionalities", () => {
  context("Test for logging in the user", () => {
    it("should be able to log in successfully", () => {
      cy.visit(baseURL + "/"); // Localhost in the env file should be changed to reflect the Admin host. We are visiting the main authentication page here.
      cy.get('[data-test-id="input-email"]').type("cypress@test.com"); // Here write your email address for your account
      cy.get('[data-test-id="input-password"]').type("cypress123"); // Write the password for your account
      cy.get('[data-test-id="button-login-and-remember"]').click(); // Here we click on the log in and remember me button
      cy.visit(baseURL + "/dashboard"); // Visiting main page of Admin
    });
  });

  context("Test for opening up the forum page", () => {
    it("should be able to access the forum page", () => {
      cy.get('[data-test-id="dropdown-helper-forum"]').click({ force: true }); // We access the forum
    });
  });

  context("Test for opening up the documentation page", () => {
    it("should be able to open corteza documentation", () => {
      cy.get('[data-test-id="dropdown-helper-docs"]').click({ force: true }); // We open the docs through this funtion
    });
  });

  context("Test for using the send feedback feature", () => {
    it("should be able to use the send feedback feature", () => {
      cy.wait(10000);
      cy.get('[data-test-id="dropdown-helper-feedback"]').click({ force: true }); // We use the send feedback feature with this function
    });
  });
});
