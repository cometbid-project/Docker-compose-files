﻿#!/usr/bin/env bash
$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition
"Script directory: " + $scriptPath

if($scriptPath -eq $null -or $scriptPath -eq "") {
  Set-Location -Path "."
} else {
  Set-Location -Path $scriptPath
}

$currname = Get-Location | select -ExpandProperty Path
"Current directory: " + $currname


curl --header 'X-Vault-Token: s.TvRfry547CMQBOl1ecy8eP8P' --request GET -v "http://localhost:8200/v1/auth/token/lookup-self"