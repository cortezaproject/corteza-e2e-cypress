/// <reference types="cypress" />
const baseURL = Cypress.env("baseURL");
// Before running this test first run the Server test 2 in order to create a user so you can log in.
describe("Test webpage tour", () => {
  context("Test for logging in the user", () => {
    it("should be able to log in successfully", () => {
      cy.visit(baseURL + "/"); // Localhost in the env file should be changed to reflect the ONE host. We are visiting the main authentication page here.
      cy.get('[data-test-id="input-email"]').type("cypress@test.com"); // Here write your email address for your account
      cy.get('[data-test-id="input-password"]').type("cypress123"); // Write the password for your account
      cy.get('[data-test-id="button-login-and-remember"]').click(); // Here we click on the log in and remember me button
      cy.visit(baseURL + "/"); // Visiting main page of ONE
    });
  });

  context("This is a function for testing the webpage tour", () => {
    it("should be able to go through the webpage tour", () => {
      cy.get(".modal-footer>:last-child()").click(); // We click on the start tour button
      Cypress._.times(5, () => {
        cy.get('[data-test-id="button-next"]').click(); // With this function we click 5 times on the next button in order to go through the tour modals
      });
      cy.wait(1000); // We wait 1s for the next function for better visibility while running the test
      cy.get('[data-test-id="button-stop-tour"]').click(); // We click on the END button
    });
  });
});
