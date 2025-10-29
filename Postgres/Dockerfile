FROM postgres:17-alpine3.22

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=recipesorg

COPY ./DBData.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
