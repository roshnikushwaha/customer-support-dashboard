const path = require("path");
const jsonServer = require("json-server");

const server = jsonServer.create();

const dbPath = path.join(__dirname, "db.json");
const publicPath = path.join(__dirname, "dist");

const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3001;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* API */
server.use("/api", router);

/* React frontend */
server.use(jsonServer.defaults({ static: publicPath }));
server.use(require("express").static(publicPath));

/* React routing fallback */
server.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});