# Setting up

```shell
yarn
```

# Running

```shell
yarn cypress open
```



# Running inside docker

## Run headless

```shell
docker-compose up --exit-code-from cypress
```

## Run Cypress with screen

```shell
docker-compose -f docker-compose.yaml -f docker-compose.screen.yaml up --exit-code-from cypress
```
