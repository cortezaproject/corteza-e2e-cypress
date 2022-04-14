/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
// Once your namespace is created from the previous step 'Local_2_Create_low_code_application', we are going to use the same namespace here

it('Log in and access the already created NS', () => {
    // First we will need to log in and access the already created NS from the previos test;
    cy.visit(baseURL + '/compose/namespaces') // When testing things locally compose part should be removed
    cy.get('[data-test-id="input-email"]').type("bojan.svirkov@planetcrust.com") // Here in .type("Email") write your email address for your account
    cy.get('[data-test-id="input-password"]').type("Corteza123") // In .type("PASS") write the password for your account
    cy.get('[data-test-id="button-login-and-remember"]').click()
    cy.get('[href="/compose/ns/Cypress_test_NS/pages"]').click() // Here we use the handle from created NS (When testing things locally compose part should be removed)
})

it('Creates a record', () => {
    cy.get('[data-test-id="button-add-record"]').click() // Here we click on + Add button
    cy.get('input:eq(2)').type("26") // We add the values for the field
    cy.get('input:eq(3)').type("Bojan") // We add the values for the field
    cy.get('input:eq(4)').type("Svirkov") // We add the values for the field
    cy.get('[data-test-id="button-save"]').click() // We click on save button
    cy.get('.nav-sidebar > a').click().click().click() // we click on demo page here
})