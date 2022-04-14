/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
// Once your namespace is created from the previous step 'Local_2_Create_low_code_application', we are going to use the same namespace here

it('Log in and access the already created NS', () => {
    // First we will need to log in and access the already created NS from the previos test;
    cy.visit(baseURL + '/compose/namespaces') // When testing things locally compose part should be removed
    cy.get('[data-test-id="input-email"]').type("bojan.svirkov@planetcrust.com") // Here in .type("Email") write your email address for your account
    cy.get('[data-test-id="input-password"]').type("Corteza123") // In .type("PASS") write the password for your account
    cy.get('[data-test-id="button-login-and-remember"]').click()
    cy.get('[href="/compose/ns/Cypress_test_NS/pages"]').click() // Here we use the handle from the created NS (When testing things locally compose part should be removed)
})

it('Create a page (Module) to store data', () => {
    cy.get('[data-test-id="button-admin"]').click() // Accessing the admin panel
    cy.get('[data-test-id="button-create"]').click() // Clicking on New Module button
    cy.get('[data-test-id="input-module-name"]').type("Cypress Test Module") // Typing the Module name
    cy.get('[data-test-id="input-module-handle"]').type("Cypress_Test_Module") // Typing the Module Handle
    cy.get('input:eq(4)').clear().type("Name") // Entering the name of the first module record field
    cy.get('input:eq(5)').clear().type("Name") // Entering the title of the first module record field
    cy.get('[data-test-id="button-field-add"]').click() // Clicking on the + Add new field button
    cy.get('input:eq(7)').type("Surname") // Entering the name of the Second module record field
    cy.get('input:eq(8)').type("Surname") // Entering the title of the Second module record field
    cy.get('[data-test-id="button-field-add"]').click() // Clicking on the + Add new field button
    cy.get('input:eq(10)').type("Age") // Entering the name of the third module record field
    cy.get('input:eq(11)').type("Age") // Entering the title of the Second module record field
    cy.get('select:eq(2)').select('Number input') // Selecting the type of the record, in this case Number input
    cy.get('[data-test-id="button-save-and-close"]').click() // Clicking on Save and close
})