/// <reference types="cypress" />
const baseURL = Cypress.env("baseURL");
// Before running this test first run the Server test 2 in order to create a user so you can log in.
describe("Test for app redirection", () => {
  context("Test for logging in the user", () => {
    it("should be able to log in successfully", () => {
      cy.visit(baseURL + "/"); // Localhost in the env file should be changed to reflect the ONE host. We are visiting the main authentication page here.
      cy.get('[data-test-id="input-email"]').type("cypress@test.com"); // Here write your email address for your account
      cy.get('[data-test-id="input-password"]').type("cypress123"); // Write the password for your account
      cy.get('[data-test-id="button-login-and-remember"]').click(); // Here we click on the log in and remember me button
      cy.visit(baseURL + "/"); // Visiting main page of ONE
    });
  });

  context("This is a function for app redirection", () => {
    it("should be able to redirect to the specified app", () => {
      cy.get(".modal-header>:last-child()").click(); // Here we close the start tour pop up
      cy.get('[data-test-id="Low Code"]').click({ force: true }); // We check if the low code app redirects to the correct URL
      cy.get(".modal-footer>:first-child()").click(); // Here we click on the skip tour button
      cy.get('[data-test-id="CRM Suite"]').click({ force: true }); // We check if the CRM app redirects to the correct URL
      cy.get('[data-test-id="Case Management"]').click({ force: true });
      cy.get('[data-test-id="Admin Area"]').click({ force: true });
      cy.get('[data-test-id="Workflows"]').click({ force: true }); // We check if the Workflows app redirects to the correct URL
      cy.get('[data-test-id="Reporter"]').click({ force: true }); // We check if the Reporter app redirects to the correct URL
      cy.get('[data-test-id="Jitsi Bridge"]').click({ force: true });
    });
  });
});
