/// <reference types="cypress" />
const baseURL = Cypress.env("baseURL");
// Before running this test first run the Server test 2 in order to create a user so you can log in.
describe("Test for creating a simple workflow", () => {
  context("Test for logging in the user", () => {
    it("should be able to log in successfully", () => {
      cy.visit(baseURL + "/"); // Localhost in the env file should be changed to reflect the Workflows host. We are visiting the main authentication page here.
      cy.get('[data-test-id="input-email"]').type("cypress@test.com"); // Here write your email address for your account
      cy.get('[data-test-id="input-password"]').type("cypress123"); // Write the password for your account
      cy.get('[data-test-id="button-login-and-remember"]').click(); // Here we click on the log in and remember me button
      cy.visit(baseURL + "/list"); // Visiting main page of Workflows
    });
  });

  context("Test for creating a new workflow", () => {
    it("should be able to create a new workflow", () => {
      cy.get('[data-test-id="button-create-workflow"]').click(); // Here we click on the button "New workflow"
      cy.get('[data-test-id="input-label"]').clear().type("Cypress workflow"); // We type the name of the workflow
      cy.get('[data-test-id="input-handle"]').type("cypress_workflow"); // We type the handle of the workflow
      cy.get('[data-test-id="input-description"]').type("This is a simple workflow created by an automated cypress test."); // We type the description of the workflow
      cy.get('[data-test-id="button-save-workflow"]').click(); // We click on the save button
      cy.get('.b-toast-success') // We confirm that the action was completed successfully
    });
  });
});
