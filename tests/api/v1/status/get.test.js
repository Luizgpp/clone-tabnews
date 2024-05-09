test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(parsedUpdatedAt).toEqual(responseBody.updated_at);

  expect(responseBody.dependencies.database.db_version).toBeDefined();
  expect(responseBody.dependencies.database.db_version).not.toBeNull();
  expect(responseBody.dependencies.database.db_version).toEqual("16.2");

  expect(responseBody.dependencies.database.max_db_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_db_connections).not.toBeNull();
  expect(responseBody.dependencies.database.max_db_connections).not.toBeNaN();
  expect(typeof responseBody.dependencies.database.max_db_connections).toBe(
    "number",
  );

  expect(responseBody.dependencies.database.current_connections).toBeDefined();
  expect(responseBody.dependencies.database.current_connections).not.toBeNull();
  expect(responseBody.dependencies.database.current_connections).not.toBeNaN();
  expect(responseBody.dependencies.database.current_connections).toEqual(1);
  expect(typeof responseBody.dependencies.database.current_connections).toBe(
    "number",
  );
});
