/// <reference types="cypress" />
const baseURL = Cypress.env("baseURL");
// Once your namespace is created from the previous step 'Local_2_Create_low_code_application', we are going to use the same namespace here

it("Log in and access the already created NS", () => {
  // First we will need to log in and access the already created NS from the previos test;
  cy.visit(baseURL + "/compose/namespaces"); // When testing things locally compose part should be removed
  cy.get('[data-test-id="input-email"]').type("EMAIL"); // Here in .type("Email") write your email address for your account
  cy.get('[data-test-id="input-password"]').type("PASS"); // In .type("PASS") write the password for your account
  cy.get('[data-test-id="button-login-and-remember"]').click();
  cy.get('[href="/compose/ns/>>HANDLE<</pages"]').click(); // Here we use the handle from the created NS (When testing things locally compose part should be removed)
  cy.get('[data-test-id="button-admin"]').click(); // Pressing on admin button
});

it("Builds a public page to display data", () => {
  cy.get("a:eq(12)").click(); // We access the pages from the sidebar
  cy.get('[data-test-id="input-name"]').type("Demo Page"); // We type the name of our page
  cy.get('[data-test-id="button-create-page"]').click(); // We click on the Create page button
  cy.get('[data-test-id="input-handle"]').type("Demo"); // We type the handle
  cy.get('[data-test-id="button-save-and-close"]').click(); //  We save and close the page
  cy.get('[data-test-id="button-page-builder"]:eq(2)').click(); // We click on the page builder
  cy.get('[data-test-id="button-add-block"]').click({ force: true }); // Clicking on + Add Block
  cy.get("button:eq(26)").click({ force: true }); // We select the Record list from blocks
  cy.get("a:eq(21)").click(); // We select the record list from the header bar
  cy.get("select:eq(0)").select("Cypress Test Module"); // We select the Module here
  cy.contains("Select all").click({ force: true }); // We add all of the items from the available items
  cy.get("button:eq(24)").click({ force: true }); // We are pressing add block button here
  cy.get('[data-test-id="button-save-and-close"]').click(); // We can see that the Block is added and we press save and close
  cy.get('[data-test-id="button-page-view"]:eq(2)').click(); // We are viewing the created page
});
