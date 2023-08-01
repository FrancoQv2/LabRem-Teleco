FROM mysql:8.0.30

# RUN chown -R mysql:root /var/lib/mysql/

ENV TZ America/Buenos_Aires

# ARG MYSQL_DATABASE
# ARG MYSQL_ROOT_PASSWORD
# ARG MYSQL_USER
# ARG MYSQL_PASSWORD

# ENV MYSQL_DATABASE=$MYSQL_DATABASE
# ENV MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD
# ENV MYSQL_USER=$MYSQL_USER
# ENV MYSQL_PASSWORD=$MYSQL_PASSWORD

COPY database/db.sql /docker-entrypoint-initdb.d/a.sql
COPY database/db-triggers.sql /docker-entrypoint-initdb.d/b.sql
COPY database/db-sp-laboratorios.sql /docker-entrypoint-initdb.d/c.sql
COPY database/db-sp-ensayos.sql /docker-entrypoint-initdb.d/d.sql

# RUN ls -l /etc/mysql
RUN ls -l /docker-entrypoint-initdb.d
# RUN cp /etc/mysql/data/db.sql /docker-entrypoint-initdb.d/a.sql
# RUN cp /etc/mysql/data/db-triggers.sql /docker-entrypoint-initdb.d/b.sql
# RUN cp /etc/mysql/data/db-sp-laboratorios.sql /docker-entrypoint-initdb.d/c.sql
# RUN cp /etc/mysql/data/db-sp-ensayos.sql /docker-entrypoint-initdb.d/d.sql

# RUN rm /docker-entrypoint-initdb.d/*

EXPOSE 3306