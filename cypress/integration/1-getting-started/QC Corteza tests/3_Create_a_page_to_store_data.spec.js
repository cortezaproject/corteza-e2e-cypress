/// <reference types="cypress" />

it('should be able to create a page that stores data', () => {
// Once your namespace is created from the previous step '2_Create_low_code_application', we are going to use the same namespace here

cy.visit('https://qc.cortezaproject.org/compose/')
cy.get(':nth-child(2) > .form-control').type("bojan.svirkov@planetcrust.com") // Here in .type("Email") write your email address for your account
    cy.get(':nth-child(3) > .form-control').type("Corteza123") // In .type("PASS") write the password for your account 
    cy.get('.btn-primary').click()
    cy.get('[href="/compose/ns/test_namespace/pages"]').click()
    // cy.get('a > .btn').click()
    cy.get(':nth-child(1) > div[data-v-146561f5=""] > .btn').click() //Use this if it is the first time you ran the second and third test
    cy.get('#__BVID__128').clear()
    cy.get('#__BVID__128').type("Company")
    cy.get('#__BVID__130').clear()
    cy.get('#__BVID__130').type("company")
    cy.get('#__BVID__169').clear()
    cy.get('#__BVID__169').type("Name")
    cy.get('#__BVID__170').type("name")
    cy.get('[colspan="7"] > .btn').click()
    cy.get('#__BVID__183').type("Region")
    cy.get('#__BVID__184').type("region")
    cy.get('#__BVID__187').select('Text input (string)')
    cy.get('[colspan="7"] > .btn').click()
    cy.get('#__BVID__192').type("Email")
    cy.get('#__BVID__193').type("email")
    cy.get('#__BVID__196').select('Email input')
    cy.get('.d-flex > .btn-light').click()
})