import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dbVersionResult = await database.query("SHOW server_version;");
  const dbVersion = dbVersionResult.rows[0].server_version;

  const dbMaxConnectionsResult = await database.query("SHOW max_connections;");

  const maxDbConnections = +dbMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;

  const query =
    "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;";

  const dbCurrenctConnectionsResult = await database.query({
    text: query,
    values: [databaseName],
  });

  const currentConnections = dbCurrenctConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        db_version: dbVersion,
        max_db_connections: maxDbConnections,
        current_connections: currentConnections,
      },
    },
  });
}

export default status;
