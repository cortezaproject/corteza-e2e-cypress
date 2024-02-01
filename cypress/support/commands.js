import 'cypress-mailhog'
import { apiClients } from '@cortezaproject/corteza-js'

const cApis = ['compose', 'system', 'workflow']

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

// api request helper for Corteza api
const cortezaApiRequest = (c, jwtToken, payload = {}) => {
  if (!c.match(/\w\.\w/)) {
    throw new Error('invalid api call, please use "subsystem.function", ie "compose.moduleCreate"')
  }

  const [ api, func ] = c.split('.')

  if (!cApis.includes(api)) {
    throw new Error('could not init Corteza api, please use one of the following: ' + cApis.join(', '))
  }

  const apiComponent = api.charAt(0).toUpperCase() + api.substring(1);
  const cl = new apiClients[apiComponent]({baseURL: `${Cypress.env('BASE_URL')}/api/${api}`, accessTokenFn: () => {return jwtToken}})

  return cl[func](payload)
  .then((response) => {
    return new Promise(function (resolve, reject) {
      resolve(response)
    })
  })
}


Cypress.Commands.add('moduleCreate', (jwtToken, payload = {}) => cortezaApiRequest('compose.moduleCreate', jwtToken, payload))
Cypress.Commands.add('pageCreate', (jwtToken, payload = {}) => cortezaApiRequest('compose.pageCreate', jwtToken, payload))
Cypress.Commands.add('pageLayoutCreate', (jwtToken, payload = {}) => cortezaApiRequest('compose.pageLayoutCreate', jwtToken, payload))

// Wrapper for db seed, used only to use db DSN value
Cypress.Commands.add('seedDb', (list) => {
  cy.task('seedDb', { list, dbDsn: Cypress.env('PROVISION_DB_DSN') })
})
