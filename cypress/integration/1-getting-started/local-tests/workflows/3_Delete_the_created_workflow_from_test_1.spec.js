/// <reference types="cypress" />
const baseURL = Cypress.env("baseURL");
// Before running this test first run the Server test 2 in order to create a user so you can log in.
describe("Test for deleting a workflow", () => {
  context("Test for logging in the user", () => {
    it("should be able to log in successfully", () => {
      cy.visit(baseURL + "/"); // Localhost in the env file should be changed to reflect the Workflows host. We are visiting the main authentication page here.
      cy.get('[data-test-id="input-email"]').type("cypress@test.com"); // Here write your email address for your account
      cy.get('[data-test-id="input-password"]').type("cypress123"); // Write the password for your account
      cy.get('[data-test-id="button-login-and-remember"]').click(); // Here we click on the log in and remember me button
      cy.visit(baseURL + "/list"); // Visiting main page of Workflows
    });
  });

  context("Test for deleting a workflow", () => {
    it("should be able to delete the workflow", () => {
      cy.contains("Cypress workflow").click(); // We click on the Workflow called Cypress workflow
      cy.get('[data-test-id="button-configure-workflow"]').click(); // We click on the configuration button
      cy.get('[data-test-id="button-delete"]').click(); // We click on the delete button
      cy.get('[data-test-id="button-delete-confirm"]').click(); // We confirm that we want to delete the workflow
      cy.get('.b-toast-success') // We confirm that the action was completed successfully 
    });
  });
});
