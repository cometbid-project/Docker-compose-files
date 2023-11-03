#!/bin/bash

SET KEYCLOAK_CLIENT_SECRET=499b4f6b-1f99-4ff6-8c88-bd98b47fd2f1
SET USER_NAME=member@service-team
SET USER_PASSWORD=password123
SET KEYCLOAK_TOKEN_URL=http://localhost:28080/auth/realms/multi-customer/protocol/openid-connect/token
for /F %%I in ('curl -u customers:%KEYCLOAK_CLIENT_SECRET% -k -d "grant_type=password&username=%USER_NAME%&password=%USER_PASSWORD%&scope=email profile" -H "Content-Type:application/x-www-form-urlencoded" %KEYCLOAK_TOKEN_URL%') do set access_token=%%I
curl -X POST %KEYCLOAK_TOKEN_URL% -H "Authorization: Bearer %access_token%" --data "grant_type=urn:ietf:params:oauth:grant-type:uma-ticket" --data "audience=customers" | jq .