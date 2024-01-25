Cypress.Commands.add('navigateAdmin', ({ el = '.nav-sidebar', timeout = 10000, app } = {}) => {
    cy.get(el, { timeout }).contains(app).click()
})

Cypress.Commands.add('searchItem', ({ item_cy_id = 'input-search', item = 'cypress', timeout = 10000 } = {}) => {
    cy.get(`[data-test-id="${item_cy_id}"]`, { timeout })
        .should('exist')
        .should('not.be', 'disabled')
        .clear()
        .type(item)
})
