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

})

it('Create a page to store data', () => {

    cy.get('.vue-portal-target > .btn').click() // Accesing the admin panel
    cy.get('.btn-primary').click() // Clicking on New Module button
    cy.get('input:eq(3)').type("Cypress Test Module") // Typing the Module name
    cy.get('input:eq(4)').type("Cypress_Test_Module") // Typing the Module Handle
    cy.get('input:eq(5)').clear().type("Name") // Entering the name of the first module record field
    cy.get('input:eq(6)').clear().type("Name") // Entering the title of the first module record field
    cy.get('[colspan="7"] > .btn').click() // Clicking on the + Add new field button
    cy.get('input:eq(8)').type("Surname") // Entering the name of the Second module record field
    cy.get('input:eq(9)').type("Surname") // Entering the title of the Second module record field
    cy.get('[colspan="7"] > .btn').click() // Clicking on the + Add new field button
    cy.get('input:eq(11)').type("Age") // Entering the name of the third module record field
    cy.get('input:eq(12)').type("Age") // Entering the title of the Second module record field
    cy.get('select:eq(2)').select('Number input') // Selecting the type of the record, in this case Number input
    cy.get('.d-flex > .btn-light').click() // Clicking on Save and close
})