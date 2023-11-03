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

echo "Stopping the vault if its already running"
docker stop vault

echo "Force remove the vault if its present"
docker rm -f vault

docker run --cap-add=IPC_LOCK `
-p 8200:8200 `
-d `
--name vault `
-e 'VAULT_DEV_ROOT_TOKEN_ID=myroot' `
-e 'VAULT_DEV_LISTEN_ADDRESS=0.0.0.0:8200' `
-e 'VAULT_ADDR=http://127.0.0.1:8200' `
vault


sleep 1
"Docker container should be up and running now -try http://0.0.0.0:8200"