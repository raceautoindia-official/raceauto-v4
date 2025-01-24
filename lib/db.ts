import mysql from "mysql2/promise";

// Create the connection to database
const db = mysql.createPool({
  host: "racedev-db.c1u6o2ewayxy.ap-south-1.rds.amazonaws.com",
  user: "root",
  database: "race_news",
  password: "Racedeveloper2024",
  waitForConnections: true,
  connectionLimit: 500,
  keepAliveInitialDelay: 0,
  queueLimit: 0,
  enableKeepAlive: true,
  idleTimeout: 60000,
});

console.log("Connected to MySQL database");

export default db;
