import 'cypress-mailhog'

Cypress.Commands.add('login', ({ email, password, buttonLoginID = 'button-login-and-remember', url } = {}) => {
  if (url) {
    cy.visit(url + '/auth/login')
  }

  if (email) {
    cy.get('[data-test-id="input-email"]').type(email)
  }

  if (password) {
    cy.get('[data-test-id="input-password"]').type(password)
  }

  cy.get(`[data-test-id="${buttonLoginID}"]`).click()
})

Cypress.Commands.add('preTestLogin', ({ email = Cypress.env('USER_EMAIL'), password = Cypress.env('USER_PASSWORD'), url }) => {
  if (!window.sessionStorage.getItem('auth.refresh-token')) {
    cy.login({ email, password, url })
  }
})

Cypress.Commands.add('authenticateClient', ({ endpoint = '/auth/oauth2/token', payload = 'grant_type=client_credentials&scope=profile api', method = 'POST' } = {}) => {
  cy.request({
    method,
    url: `${Cypress.env('BASE_URL')}${endpoint}`,
    body: payload,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      user: Cypress.env('AUTH_CLIENT_ID'),
      pass: Cypress.env('AUTH_CLIENT_SECRET'),
      sendImmediately: true,
    }
  }
  ).then(
    (response) => {
      expect(response.status).to.eq(200)

      return new Promise(function (resolve, reject) {
        if (response.body.hasOwnProperty('access_token')) {
          resolve(response.body.access_token)
        } else {
          reject('no access token')
        }
      })
    }
  )
})

Cypress.Commands.add('composeApiRequest', ({ endpoint, payload, jwt, method = 'POST' } = {}) => {
  cy.request({
    method,
    url: `${Cypress.env('BASE_URL')}/api${endpoint}`,
    body: payload,
    auth: {
      bearer: jwt
    }
  }
  ).then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.status).to.eq(200)
    }
  )
})

// Wrapper for db seed, used only to use db DSN value
Cypress.Commands.add('seedDb', (list) => {
  cy.task('seedDb', { list, dbDsn: Cypress.env('PROVISION_DB_DSN') })
})
