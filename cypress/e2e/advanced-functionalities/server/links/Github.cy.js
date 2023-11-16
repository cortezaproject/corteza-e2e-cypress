/// <reference types="cypress" />

describe('Testing github link', () => {
  context('Testing github link', () => {
    it('should be able to click on github and be redirected', () => {
      cy.get('[data-test-id="link-github"]').click()
      cy.url().should('exist', 'https://github.com/cortezaproject/')
    })
  })
})
