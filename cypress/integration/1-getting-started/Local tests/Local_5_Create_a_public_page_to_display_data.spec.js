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

it('Builds a public page to display data', () => {

    cy.get('a:eq(12)').click() // We access the pages from the sidebar
    cy.get('#name').type("Demo Page") // We type the name of our page
    cy.get('button:eq(11)').click() // We click on the Create page button
    cy.get('input:eq(5)').type("Demo") // We type the handle 
    cy.get('button:eq(13)').click() //  We save and close the page
    cy.get('a:eq(20)').click() // We click on the page builder
    cy.get('button:eq(12)').click({force: true}) // Clicking on + Add Block
    cy.get('button:eq(27)').click() // We select the Record list from blocks
    cy.get('a:eq(20)').click() // We select the record list from the header bar
    cy.get('select:eq(1)').select('Cypress Test Module') // We select the Module here
    cy.contains('Select all').click({force: true}) // We add all of the items from the available items
    cy.get('button:eq(28)').click({force: true}) // We are pressing add block button here 
    cy.get('.d-flex > .btn-light').click() // We can see that the Block is added and we press save and close
    cy.get('a:eq(21)').click() // We are viewing the created page
})
