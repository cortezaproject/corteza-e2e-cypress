Cypress.Commands.add('navigateAdmin', ({ el = '.nav-sidebar', timeout = 10000, app } = {}) => {
    cy.get(el, { timeout }).contains(app).click()
})