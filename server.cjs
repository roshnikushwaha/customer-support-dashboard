const path = require("path");
const fs = require("fs");
const jsonServer = require("json-server");

const server = jsonServer.create();

const dbPath = path.join(__dirname, "db.json");

console.log("DB PATH:", dbPath);
console.log("DB EXISTS:", fs.existsSync(dbPath));

const dbContent = fs.readFileSync(dbPath, "utf8");
console.log("DB HAS TICKETS:", dbContent.includes('"tickets"'));

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

server.use(router);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`JSON Server running on port ${PORT}`);
});