/// <reference types="cypress" />

it('should be able to visit the page', () => {

    cy.visit('http://127.0.0.1:8080/')

})

it('should be able to go to the create a new account page', () => {

    cy.get(':nth-child(2) > a').click()
})

it('should be able to write signup credentials', () => {

    cy.get(':nth-child(2) > .form-control').type("cypress@test.com")
    cy.get(':nth-child(3) > .form-control').type("CypressTest123$?")
    cy.get(':nth-child(4) > .form-control').type("Cypress Test Account")
    cy.get(':nth-child(5) > .form-control').type("Cypress_test_account")
})

it('should be able create the account', () => {

    cy.get('#submit').click()
    cy.request('http://localhost:3000/auth/signup')
   
})
