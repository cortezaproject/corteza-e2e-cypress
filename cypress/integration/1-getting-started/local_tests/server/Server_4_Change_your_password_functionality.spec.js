/// <reference types="cypress" />
const baseURL = Cypress.env("baseURL");

it("should be able to visit the login page", () => {
  cy.visit(baseURL + "/"); // When running this test make sure that the base url is set to localhost:3000
});

it("should be able to log in, access the security tab and change your password", () => {
  cy.get('[data-test-id="input-email"]').type("cypress@test.com"); // Here write your email address for your account
  cy.get('[data-test-id="input-password"]').type("cypress123"); //  Write the password for your account
  cy.get('[data-test-id="button-login-and-remember"]').click(); // Here we click on the log in and remember me button
  cy.get('[data-test-id="link-tab-security"]').click(); // Here we click on the Security tab
  cy.get('[data-test-id="link-change-password"]').click(); // Here we click on change your password button
  cy.get('[data-test-id="input-old-password"]').type("cypress123"); // We retype the old password
  cy.get('[data-test-id="input-new-password"]').type("newcypress123"); // Here we type the new prefered password
  cy.get('[data-test-id="button-change-password"]').click(); // Here we click on the change your password button
});
