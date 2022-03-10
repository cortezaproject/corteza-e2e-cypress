/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

it('should be able to visit the page', () => {

    cy.visit(baseURL + '/')

})

it('should be able to enter login credentials', () => {

    cy.get('[name=email]').type("bojan.svirkov@planetcrust.com") // Here in .type("Email") write your email address for your account
    cy.get('[name=password]').type("Corteza123") // In .type("PASS") write the password for your account

})

it('should be able to login in', () => {

    cy.get('.btn-primary').click()
    cy.get('[href="/"] > .bi').click()
    cy.get('.close').click()
    cy.visit(baseURL + '/compose/namespaces')

})


it('should be able to create a new namespace', () => {

    cy.get('.btn-primary').click()
    cy.get('input:eq(1)').type("Cypress test namespace")    // in .type("Name") write the name of your namespace
    cy.get('input:eq(2)').type("Cypress_test_NS")  // in .type("handle") write the short name/handle of your namespace
    cy.get('.d-flex > .btn-light').click()

})