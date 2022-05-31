/// <reference types="cypress" />
const baseURL = Cypress.env("baseURL");
// Before running this test first run the Server test 2 in order to create a user so you can log in.
describe("Test search bar functionality", () => {
  context("Test for logging in the user", () => {
    it("should be able to log in successfully", () => {
      cy.visit(baseURL + "/"); // Localhost in the env file should be changed to reflect the ONE host. We are visiting the main authentication page here.
      cy.get('[data-test-id="input-email"]').type("cypress@test.com"); // Here write your email address for your account
      cy.get('[data-test-id="input-password"]').type("cypress123"); // Write the password for your account
      cy.get('[data-test-id="button-login-and-remember"]').click(); // Here we click on the log in and remember me button
      cy.visit(baseURL + "/"); // Visiting main page of ONE
    });
  });

  context("Test for searching the Admin Area", () => {
    it("should be able to search for the Admin Area", () => {
      cy.get(".modal-header>:last-child()").click(); // Here we close the start tour pop up
      cy.get('[data-test-id="input-search"]').type("admin"); // We search for the Admin app
      cy.get('[data-test-id="Admin Area"]').click({ force: true });
    });
  });

  context("Test for searching the CRM", () => {
    it("should be able to search for the CRM", () => {
      cy.get(".modal-header>:last-child()").click(); // Here we close the start tour pop up
      cy.get('[data-test-id="input-search"]').type("CRM"); // We search for the CRM app
      cy.get('[data-test-id="CRM Suite"]').click({ force: true });
    });
  });

  context("Test for searching the Low Code", () => {
    it("should be able to search for the Low Code", () => {
      cy.get(".modal-header>:last-child()").click(); // Here we close the start tour pop up
      cy.get('[data-test-id="input-search"]').clear().type("low code"); // We search for the Low code app
      cy.get('[data-test-id="Low Code"]').click({ force: true });
    });
  });

  context("Test for searching the Workflows", () => {
    it("should be able to search for the Workflows", () => {
      cy.get(".modal-header>:last-child()").click(); // Here we close the start tour pop up
      cy.get('[data-test-id="input-search"]').clear().type("workflow"); // We search for the Workflows app
      cy.get('[data-test-id="Workflows"]').click({ force: true });
    });
  });

  context("Test for searching the Reporter", () => {
    it("should be able to search for the Reporter", () => {
      cy.get(".modal-header>:last-child()").click(); // Here we close the start tour pop up
      cy.get('[data-test-id="input-search"]').clear().type("reporter"); // We search for the Reporter app
      cy.get('[data-test-id="Reporter"]').click({ force: true });
    });
  });

  context("Test for searching the Case Management", () => {
    it("should be able to search for the Case Management", () => {
      cy.get(".modal-header>:last-child()").click(); // Here we close the start tour pop up
      cy.get('[data-test-id="input-search"]').clear().type("case management"); // We search for the Case Management app
      cy.get('[data-test-id="Case Management"]').click({ force: true });
    });
  });

  context("Test for searching the Jitsi Bridge", () => {
    it("should be able to search for the Jitsi Bridge", () => {
      cy.get(".modal-header>:last-child()").click(); // Here we close the start tour pop up
      cy.get('[data-test-id="input-search"]').clear().type("jitsi"); // We search for the Jitsi bridge app
      cy.get('[data-test-id="Jitsi Bridge"]').click({ force: true });
    });
  });
});
