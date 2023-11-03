#!/usr/bin/env bash
$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition
"Script directory: " + $scriptPath

if($scriptPath -eq $null -or $scriptPath -eq "") {
  Set-Location -Path "."
} else {
  Set-Location -Path $scriptPath
}

$currname = Get-Location | select -ExpandProperty Path
"Current directory: " + $currname

echo "Create engine and keyvalue secrets"
docker exec "vault" vault login myroot
docker exec "vault" vault secrets enable -version=2 -path="secret" kv
docker exec "vault" vault kv put "secret/licensing-service/prod" `
topsecret.user="chuck_norris" `
topsecret.password="mia" `
topsecret.car="Hummer"

docker exec "vault" vault kv put "secret/licensing-service,dev" `
license.vault.property="Welcome to vault" `
spring.security.oauth2.client.registration.okta.client-id=myClientId `
spring.datasource.url=jdbc:postgresql://database:5432/ostock_dev `
spring.datasource.username=postgres `
spring.datasource.password=postgres `
spring.jpa.database=POSTGRESQL `
spring.datasource.platform=postgres `
spring.jpa.show-sql=true `
spring.jpa.hibernate.naming-strategy=org.hibernate.cfg.ImprovedNamingStrategy `
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect `
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect `
spring.database.driverClassName=org.postgresql.Driver `

docker exec "vault" vault kv put "secret/licensing-service/dev" `
topsecret.user="bond_james_bond" `
topsecret.password="007" `
topsecret.car="Aston Martin" `
spring.data.mongodb.database="vaultdemo" `
spring.data.mongodb.host="0.0.0.0" `
spring.data.mongodb.port="28017" `
spring.data.mongodb.username="bondjamesbond" `
spring.data.mongodb.password="007isthepassword" `
spring.data.mongodb.authentication-database="admin"