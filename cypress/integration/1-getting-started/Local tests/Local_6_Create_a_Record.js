/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')
// Once your namespace is created from the previous step 'Local_2_Create_low_code_application', we are going to use the same namespace here

it('Log in and access the already created NS', () => {
    
    // First we will need to log in and access the already created NS from the previos test;

    cy.visit(baseURL + '/compose/namespaces')
    cy.get('[name=email]').type("bojan.svirkov@planetcrust.com") // Here in .type("Email") write your email address for your account
    cy.get('[name=password]').type("Corteza123") // In .type("PASS") write the password for your account
    cy.get('.btn-primary').click()
    cy.get('[href="/compose/ns/Cypress_test_NS/pages"]').click() // Here we use the handle from the created NS
    cy.get('.vue-portal-target > .btn').click()

})

it('Creates a record', () => {

    cy.get('a:eq(20)').click() // Here we click on All Records
    cy.get('a:eq(17)').click() // Here we click on + Add button
    cy.get('input:eq(3)').type("26") // We add the values for the field
    cy.get('input:eq(4)').type("Bojan") // We add the values for the field
    cy.get('input:eq(5)').type("Svirkov") // We add the values for the field
    cy.get('button:eq(12)').click() // We click on save button
})