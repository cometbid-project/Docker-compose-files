# Changes these CN's to match your hosts in your environment if needed.
USER_SERVER_CN=localhost
MERCHANT_CLIENT_CN=localhost # Used when doing mutual TLS

echo Generate User CA key:
openssl genrsa -passout pass:1111 -des3 -out /export/tmp/sslcert/user-ca.key 4096
echo Generate User CA certificate:
# Generates user-ca.crt which is the trustCertCollectionFile
openssl req -passin pass:1111 -new -x509 -days 365 -key /export/tmp/sslcert/user-ca.key -out /export/tmp/sslcert/user-ca.crt -subj "/CN=${USER_SERVER_CN}"

echo Generate User server key:
openssl genrsa -passout pass:1111 -des3 -out /export/tmp/sslcert/user-server.key 4096
echo Generate user-server signing request:
openssl req -passin pass:1111 -new -key /export/tmp/sslcert/user-server.key -out /export/tmp/sslcert/user-server.csr -subj "/CN=${USER_SERVER_CN}"
echo Self-signed User server certificate:
# Generates user-server.crt which is the certChainFile for the User server
openssl x509 -req -passin pass:1111 -days 365 -in /export/tmp/sslcert/user-server.csr -CA /export/tmp/sslcert/user-ca.crt -CAkey /export/tmp/sslcert/user-ca.key -set_serial 01 -out /export/tmp/sslcert/user-server.crt 
echo Remove passphrase from User server key:
openssl rsa -passin pass:1111 -in /export/tmp/sslcert/user-server.key -out /export/tmp/sslcert/user-server.key

echo Converting the private keys to X.509:
# Generates user-server.pem which is the privateKeyFile for the User Server
openssl pkcs12 -passout pass:1111 -topk8 -in /export/tmp/sslcert/user-server.key -out /export/tmp/sslcert/user-server.pem

# Generates user-server.pem which is the privateKeyFile for the Keycloack Server
openssl pkcs12 -export -inkey serverkey.pem -in servercert.pem -name localhost -out keystore.p12

#echo Converting the private keys to X.509:
# Generates merchant-user-client.pem which is the clientPrivateKeyFile for the User Client (needed for mutual TLS only)
#openssl pkcs8 -passout pass:1111 -topk8 -in /export/tmp/sslcert/merchant-user-client.key -out /export/tmp/sslcert/merchant-user-client.pem
# Generates user-server.pem which is the privateKeyFile for the User Server
#openssl pkcs8 -passout pass:1111 -topk8 -in /export/tmp/sslcert/user-server.key -out /export/tmp/sslcert/user-server.pem

keytool -importkeystore -srckeystore keystore.p12 -srcstoretype pkcs12 -destkeystore keystore.jks

#Cleans up
rm /export/tmp/sslcert/user-ca.key
rm /export/tmp/sslcert/merchant-user-client.key
rm /export/tmp/sslcert/user-server.key 
rm /export/tmp/sslcert/merchant-user-client.csr
rm /export/tmp/sslcert/user-server.csr

