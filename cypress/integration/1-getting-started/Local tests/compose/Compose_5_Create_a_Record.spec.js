/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
// Once your namespace is created from the previous step 'Local_2_Create_low_code_application', we are going to use the same namespace here

it('Log in and access the already created NS', () => {
    // First we will need to log in and access the already created NS from the previos test;
    cy.visit(baseURL + '/compose/namespaces') // When testing things locally compose part should be removed
    cy.get('[data-test-id="input-email"]').type("EMAIL") // Here in .type("Email") write your email address for your account
    cy.get('[data-test-id="input-password"]').type("PASS") // In .type("PASS") write the password for your account
    cy.get('[data-test-id="button-login-and-remember"]').click()
    cy.get('[href="/compose/ns/>>HANDLE<</pages"]').click() // Here we use the handle from the created NS (When testing things locally compose part should be removed)
    cy.get('[data-test-id="button-admin"]').click() // Pressing on admin button
})

it('Creates a record', () => {
    cy.get('[data-test-id="button-add-record"]').click() // Here we click on + Add button
    cy.get('input:eq(2)').type("VALUE") // We add the values for the field (Type in some value)
    cy.get('input:eq(3)').type("NAME") // We add the values for the field (Type a NAME)
    cy.get('input:eq(4)').type("SURNAME") // We add the values for the field (type a SURNAME)
    cy.get('[data-test-id="button-save"]').click() // We click on save button
    cy.get('.nav-sidebar > a').click().click().click() // we click on demo page here
})