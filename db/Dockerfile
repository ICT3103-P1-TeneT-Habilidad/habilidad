FROM mcr.microsoft.com/mssql/server:2022-latest
WORKDIR /app
COPY . /app
ENV ACCEPT_EULA=Y
USER root
RUN chmod +x ./initialise-sql.sh
RUN chmod +x ./entrypoint.sh
USER mssql

CMD /bin/bash ./entrypoint.sh