/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

it('should be able to visit the page', () => {

    cy.visit(baseURL + '/')

})

it('should be able to enter login credentials', () => {

    cy.get(':nth-child(1) > .form-control').type("bojan.svirkov@planetcrust.com") // Here in .type("Email") write your email address for your account
    cy.get(':nth-child(2) > .form-control').type("Corteza123") // In .type("PASS") write the password for your account

})

it('should be able to login in', () => {

    cy.get('.btn-primary').click()

})


    //cy.get('.btn-secondary').click()
    //cy.visit('https://qc.cortezaproject.org/compose/')
    //cy.get('.btn-primary').click()
    //cy.get('#ns-nm').type("Cypress Test Namespace") // in .type("Name") write the name of your namespace
    //cy.get('#__BVID__97').type("test_namespace") // in .type("handle") write the short name/handle of your namespace
    //cy.get('.d-flex > .btn-light').click()
    //cy.get('[href="/compose/ns/test_namespace/pages"]').click() // here in the link where it says test_namespace, use your handle that you gave in the function above

