/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

it('should be able to create a page that stores data', () => {
// Once your namespace is created from the previous step '2_Create_low_code_application', we are going to use the same namespace here

cy.visit(baseURL + '/compose/')
cy.get(':nth-child(2) > .form-control').type("bojan.svirkov@planetcrust.com") // Here in .type("Email") write your email address for your account
    cy.get(':nth-child(3) > .form-control').type("Corteza123") // In .type("PASS") write the password for your account
    cy.get('.btn-primary').click()
    cy.get('[href="/compose/ns/test_namespace/pages"]').click()
    // cy.get('a > .btn').click()
    cy.get(':nth-child(1) > div[data-v-146561f5=""] > .btn').click() //Use this if it is the first time you ran the second and third test
    cy.get('#__BVID__138').clear()
    cy.get('#__BVID__138').type("Company")
    cy.get('#__BVID__140').clear()
    cy.get('#__BVID__140').type("company")
    cy.get('#__BVID__184').clear()
    cy.get('#__BVID__184').type("Name")
    cy.get('#__BVID__185').type("name")
    cy.get('[colspan="7"] > .btn').click()
    cy.get('#__BVID__198').type("Region")
    cy.get('#__BVID__199').type("region")
    cy.get('#__BVID__202').select('Text input (string)')
    cy.get('[colspan="7"] > .btn').click()
    cy.get('#__BVID__207').type("Email")
    cy.get('#__BVID__208').type("email")
    cy.get('#__BVID__211').select('Email input')
    cy.get('.d-flex > .btn-light').click()
})
