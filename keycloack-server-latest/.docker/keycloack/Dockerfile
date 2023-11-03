#docker build -t local/keycloak:20.0 .
#Specifying image version
FROM quay.io/keycloak/keycloak:20.0 as builder

ENV KC_METRICS_ENABLED=true
ENV KC_FEATURES=token-exchange
ENV KC_DB=postgres
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:20.0
COPY --from=builder /opt/keycloak/lib/quarkus/ /opt/keycloak/lib/quarkus/
WORKDIR /opt/keycloak

# Extracting passed parameters
ARG KEYCLOAK_ADMIN
ARG KEYCLOAK_ADMIN_PASSWORD
ARG POSTGRE_DB_USERNAME
ARG POSTGRE_DB_PASSWORD
ARG KEYCLOAK_HOSTNAME

ENV KEYCLOAK_ADMIN=${KEYCLOAK_ADMIN}
RUN echo $KEYCLOAK_ADMIN
ENV KEYCLOAK_ADMIN_PASSWORD=${KEYCLOAK_ADMIN_PASSWORD}
RUN echo $KEYCLOAK_ADMIN_PASSWORD

# change these values to point to a running postgres instance
ENV KC_DB_URL=jdbc:postgresql://keycloak_db:5432/keycloak?ssl=allow
ENV KC_DB_USERNAME=${POSTGRE_DB_USERNAME}
ENV KC_DB_PASSWORD=${POSTGRE_DB_PASSWORD}
ENV KC_HOSTNAME=${KEYCLOAK_HOSTNAME}
ENV KC_HOSTNAME_STRICT=false
ENV KC_HTTP_ENABLED=true
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start"]
