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

it('Builds a webpage (record page) to display data', () => {

    cy.get('.mr-2').click() // Clicking on Create Record Page button
    cy.get('.text-light > .svg-inline--fa').click() // Pressing on the edit icon here 
    cy.get('#title').type("This is the title of the block") // Title of the block
    cy.get('#description').type("This is the description of the block") // Description of the block
    cy.get('a:eq(19)').click() // Accesing the Record tab from the header 
    cy.get('button:eq(22)').click() // With this command we select all of the available items from the available items field
    cy.get('button:eq(25)').click() // We click on Save and Close with this command 
    cy.get('button:eq(16)').click() // And again clicking on save and close on the whole builder

})
