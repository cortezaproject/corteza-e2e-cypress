/// <reference types="cypress" />

it('should be able to create a low code application', () => {

    cy.visit('https://qc.cortezaproject.org/')
    cy.get(':nth-child(2) > .form-control').type("bojan.svirkov@planetcrust.com") // Here in .type("Email") write your email address for your account
    cy.get(':nth-child(3) > .form-control').type("Corteza123") // In .type("PASS") write the password for your account 
    cy.get('.btn-primary').click()
    cy.get('.btn-secondary').click()
    cy.visit('https://qc.cortezaproject.org/compose/')
    cy.get('.btn-primary').click()
    cy.get('#ns-nm').type("Cypress Test Namespace") // in .type("Name") write the name of your namespace
    cy.get('#__BVID__97').type("test_namespace") // in .type("handle") write the short name/handle of your namespace
    cy.get('.d-flex > .btn-light').click()
    cy.get('[href="/compose/ns/test_namespace/pages"]').click() // here in the link where it says test_namespace, use your handle that you gave in the function above

})
