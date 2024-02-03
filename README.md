# Adu.in microservices


# Requirement to run this projects

- docker (optional)
- docker compose

if you does not have docker installed on your machine, you need to install this items
- postgreSQL
- golang v1.21
- nodejs v.18


# Running with docker
you need to make sure that .env file on service complaint & service auth already setup for docker, check the comment
./service-complaint/.env
```env
##  COMMENT THIS IF YOU'RE NOT RUN THIS PROJECT FROM DOCKER-COMPOSE
SQL_DB_READ_DSN="postgres://aduinuser:aduin@190@postgresql:5432/aduindb?sslmode=disable&TimeZone=Asia/Jakarta"
SQL_DB_WRITE_DSN="postgres://aduinuser:aduin@190@postgresql:5432/aduindb?sslmode=disable&TimeZone=Asia/Jakarta"

##  CHANGE THIS WITH YOUR LOCAL POSTGRES ENVIRONTMENT
# SQL_DB_READ_DSN="postgres://aduinuser:aduin@190@localhost:5432/aduindb?sslmode=disable&TimeZone=Asia/Jakarta"
# SQL_DB_WRITE_DSN="postgres://aduinuser:aduin@190@localhost:5432/aduindb?sslmode=disable&TimeZone=Asia/Jakarta"

##  COMMENT THIS IF YOU'RE NOT RUN THIS PROJECT FROM DOCKER-COMPOSE
SERVICE_AUTH_HOST=http://service-auth:8000
##  CHANGE THIS WITH YOUR LOCAL SERVICE-AUTH ENVIRONTMENT
# SERVICE_AUTH_HOST=http://localhost:8000
```

./service-auth/.env
```env
##  COMMENT THIS IF YOU'RE NOT RUN THIS PROJECT FROM DOCKER-COMPOSE
SQL_DB_READ_DSN="postgres://aduinuser:aduin@190@postgresql:5432/aduindb?sslmode=disable&TimeZone=Asia/Jakarta"
SQL_DB_WRITE_DSN="postgres://aduinuser:aduin@190@postgresql:5432/aduindb?sslmode=disable&TimeZone=Asia/Jakarta"

##  CHANGE THIS WITH YOUR LOCAL POSTGRES ENVIRONTMENT
# SQL_DB_READ_DSN="postgres://aduinuser:aduin@190@localhost:5432/aduindb?sslmode=disable&TimeZone=Asia/Jakarta"
# SQL_DB_WRITE_DSN="postgres://aduinuser:aduin@190@localhost:5432/aduindb?sslmode=disable&TimeZone=Asia/Jakarta"
```

then you only need to run this command
```sh
docker compose up
```


# How to run frontend apps

### aduin website
```sh
cd aduin
npm install
npm run start
```

### aduin admin
```sh
cd super_admin
npm install --legacy-peer-deps
npm run start
```

# How to run backend apps
you need to make sure the postgres database already up and running, you also need to import the aduindb.sql to your local postgres

you need to make sure that .env file on service complaint & service auth already setup for docker, check the comment
./service-complaint/.env
```env
##  COMMENT THIS IF YOU'RE NOT RUN THIS PROJECT FROM DOCKER-COMPOSE
# SQL_DB_READ_DSN="postgres://aduinuser:aduin@190@postgresql:5432/aduindb?sslmode=disable&TimeZone=Asia/Jakarta"
# SQL_DB_WRITE_DSN="postgres://aduinuser:aduin@190@postgresql:5432/aduindb?sslmode=disable&TimeZone=Asia/Jakarta"

##  CHANGE THIS WITH YOUR LOCAL POSTGRES ENVIRONTMENT
SQL_DB_READ_DSN="postgres://CHANGE_ME_WITH_YOUR_POSTGRES_USERNAME:CHANGE_ME_WITH_YOUR_POSTGRES_PASSWORD@localhost:5432/CHANGE_ME_WITH_YOUR_POSTGRES_DATABASE?sslmode=disable&TimeZone=Asia/Jakarta"
SQL_DB_WRITE_DSN="postgres://CHANGE_ME_WITH_YOUR_POSTGRES_USERNAME:CHANGE_ME_WITH_YOUR_POSTGRES_PASSWORD@localhost:5432/CHANGE_ME_WITH_YOUR_POSTGRES_DATABASE?sslmode=disable&TimeZone=Asia/Jakarta"

##  COMMENT THIS IF YOU'RE NOT RUN THIS PROJECT FROM DOCKER-COMPOSE
# SERVICE_AUTH_HOST=http://service-auth:8000
##  CHANGE THIS WITH YOUR LOCAL SERVICE-AUTH ENVIRONTMENT
SERVICE_AUTH_HOST=http://localhost:8000
```

./service-auth/.env
```env
##  COMMENT THIS IF YOU'RE NOT RUN THIS PROJECT FROM DOCKER-COMPOSE
# SQL_DB_READ_DSN="postgres://aduinuser:aduin@190@postgresql:5432/aduindb?sslmode=disable&TimeZone=Asia/Jakarta"
# SQL_DB_WRITE_DSN="postgres://aduinuser:aduin@190@postgresql:5432/aduindb?sslmode=disable&TimeZone=Asia/Jakarta"

##  CHANGE THIS WITH YOUR LOCAL POSTGRES ENVIRONTMENT
SQL_DB_READ_DSN="postgres://CHANGE_ME_WITH_YOUR_POSTGRES_USERNAME:CHANGE_ME_WITH_YOUR_POSTGRES_PASSWORD@localhost:5432/CHANGE_ME_WITH_YOUR_POSTGRES_DATABASE?sslmode=disable&TimeZone=Asia/Jakarta"
SQL_DB_WRITE_DSN="postgres://CHANGE_ME_WITH_YOUR_POSTGRES_USERNAME:CHANGE_ME_WITH_YOUR_POSTGRES_PASSWORD@localhost:5432/CHANGE_ME_WITH_YOUR_POSTGRES_DATABASE?sslmode=disable&TimeZone=Asia/Jakarta"
```

### service auth
```sh
cd service-auth
go mod download
go run main.go
```

### service complaint
```sh
cd service-complaint
go mod download
go run main.go
```