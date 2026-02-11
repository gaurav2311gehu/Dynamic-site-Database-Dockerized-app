const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const TaskModel = require("./models/task");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// DB Connection
const sequelize = new Sequelize("tasksdb", "postgres", "postgres", {
  host: "db",
  dialect: "postgres",
});

const Task = TaskModel(sequelize);

// Sync DB
sequelize.sync();

app.get("/", async (req, res) => {
  const tasks = await Task.findAll();
  res.render("index", { tasks });
});

app.post("/add", async (req, res) => {
  await Task.create({ title: req.body.title });
  res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
  await Task.destroy({ where: { id: req.params.id } });
  res.redirect("/");
});

app.listen(3000, () => console.log("Server running on port 3000"));
