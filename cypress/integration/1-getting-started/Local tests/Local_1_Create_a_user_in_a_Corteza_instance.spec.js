/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

it('should be able to visit the page', () => {
  cy.visit(baseURL + '/')
})

it('should be able to go to the create a new account page', () => {
    cy.request(baseURL + '/auth/signup')
    cy.visit(baseURL + '/auth/signup')
})

it('should be able to write signup credentials, create an account and log in', () => {
   
    cy.get('[name=email]').type("cypress@test.com")
    cy.get('[name=password]').type("CypressTest123$?")
    cy.get('[name=name]').type("Cypress Test Account")
    cy.get('[name=handle]').type("Cypress_test_account")
    cy.get('#submit').click()
    cy.get('[href="/"] > .bi').click()
    cy.get('.close').click()
})