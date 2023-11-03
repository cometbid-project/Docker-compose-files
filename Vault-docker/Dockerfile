FROM alpine AS vault
LABEL application=vault-app

COPY . .
# These line for /entrypoint.sh
COPY ./vault_scripts/hashicorp_vault/start_vault_docker.sh /usr/local/bin/start-vault.sh
COPY ./vault_scripts/hashicorp_vault/profile_secrets.sh /usr/local/bin/init-secrets.sh

WORKDIR /usr/local/bin

RUN chmod +x start-vault.sh
RUN chmod +x init-secrets.sh

# Test entrypoint
CMD ["start-vault.sh"]
CMD ["init-secrets.sh"]

#RUN rm -rf /usr/local/bin

# Release stage
FROM alpine
LABEL application=vault-app

# Create app user
RUN addgroup -g 1000 app && \
	adduser -u 1000 -G app -D app

COPY . .
# These line for /entrypoint.sh
COPY ./vault_scripts/hashicorp_vault/start_vault_docker.sh /usr/local/bin/start-vault.sh

WORKDIR /usr/local/bin

RUN chmod +x start-vault.sh

# Test entrypoint
CMD ["start-vault.sh"]

#RUN rm -rf /usr/local/bin

# Set working directory and application user
WORKDIR /app
USER app