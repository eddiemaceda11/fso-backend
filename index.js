require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :res[content-length] - :response-time ms :body"));

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

//
const generateId = () => {
  return Math.floor(Math.random() * 1200);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = 3003;
app.listen(PORT);
console.log(`server ${PORT}`);
