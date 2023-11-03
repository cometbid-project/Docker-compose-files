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

$jsonfile = '@'+ $scriptPath + '\createtoken.json';
"Json file name: " + $jsonfile

curl --header 'X-Vault-Token: myroot' --request POST -v --data $jsonfile "http://localhost:8200/v1/auth/token/create-orphan"