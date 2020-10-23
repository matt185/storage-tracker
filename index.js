const app = require("./util/server/server")
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const db = require("./util/db/knex");

(async () => {
  try {
    console.log("Running migrations");
    await db.migrate.latest();

    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}/graphql`));
  } catch (err) {
    console.error("Error starting App", err);
    process.exit(-1);
  }
})();