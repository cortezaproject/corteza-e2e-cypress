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

it("Builds a webpage (record page) to display data", () => {
  cy.get('[data-test-id="button-record-page-create"]').click(); // Clicking on Create Record Page button
  cy.get(".related-pages-dropdown").click();
  cy.get('[data-test-id="dropdown-link-record-list-page-create"]').click({force: true});
});
