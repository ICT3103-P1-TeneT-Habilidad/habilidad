# Sql Server container can take some time to start up. 
sleep 10s

# Note the SA password here as well.
# Ideally, I'd have an environment variable to handle this (maybe we can use the SA_PASSWORD one?)
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P ${MSSQL_SA_PASSWORD} -d master -i /app/migrations/initial.sql