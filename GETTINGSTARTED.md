# Getting started

## Add environmental variables

### Set server API as BASE_URL

```shell
  "BASE_URL": "http://localhost:3000",
```

### Set webapp APIs

```shell
  "ADMIN_URL": "http://localhost:8080",
  "COMPOSE_URL": "http://localhost:8081",
  "WORKFLOW_URL": "http://localhost:8082",
  "REPORTER_URL": "http://localhost:8083",
  "ONE_URL": "http://localhost:8084",
```

### Set user credentials

```shell
  "USER_EMAIL": "cypress@test.com",
  "USER_PASSWORD": "cypress123",
  "USER_PASSWORD_NEW": "newcypress123",
  "USER_EMAIL_NEW": "permissions@email.com"
```

# Running

```shell
yarn cypress open
```

or

```shell
yarn run cy:open
```

## Running specific cypress tests using CLI

yarn cypress run --spec 'HERE INCLUDE THE PATH OF YOUR TEST'

<br />

# Running inside docker

## Run headless

```shell
docker-compose up --exit-code-from cypress
```

## Run Cypress with screen

```shell
docker-compose -f docker-compose.yaml -f docker-compose.screen.yaml up --exit-code-from cypress
```

# Custom commands

This project also adds several custom commands in cypress/support/commands.js. They are useful to create one or more default todos from the tests.

```shell
Cypress.Commands.add('login', (params) => {
  // custom login function
}
```

# Troubleshooting

## Use in case of a CSRF token issue

```shell
AUTH_CSRF_ENABLED=false
```
