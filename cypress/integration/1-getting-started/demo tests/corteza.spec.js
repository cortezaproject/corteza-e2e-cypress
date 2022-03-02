/// <reference types="cypress" />
const baseURL = Cypress.env('baseURL')

it('should be able to create a new namespace', () => {

    cy.visit(baseURL + '/')

    cy.get(':nth-child(2) > .form-control').type("bojan.svirkov@planetcrust.com{enter}")
    cy.get(':nth-child(3) > .form-control').type("Corteza123{enter}")
    cy.visit(baseURL + '/compose/namespaces')
    cy.get('.btn-primary').click()
    cy.get('#ns-nm').type("Cypress test namespace")
    cy.get('#__BVID__82').type("CypressTest")
    cy.get('.d-flex > .btn-light').click()
})
