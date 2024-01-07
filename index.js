const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :res[content-length] - :response-time ms :body"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    return response.status(404).json({
      error: "content missing",
    });
  }
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

  for (let person of persons) {
    if (person.name === body.name)
      return response.status(400).json({
        error: "name must be unique",
      });
  }

  if (!body.name) {
    return response.status(400).json({
      error: "content missing, no name",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "content missing, no number",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});
console.log(persons);

const PORT = 3003;
app.listen(PORT);
console.log(`server ${PORT}`);

/*
var express = require('express')
var morgan = require('morgan')
var uuid = require('node-uuid')

morgan.token('id', function getId (req) {
  return req.id
})

var app = express()

app.use(assignId)
app.use(morgan(':id :method :url :response-time'))

app.get('/', function (req, res) {
  res.send('hello, world!')
})

function assignId (req, res, next) {
  req.id = uuid.v4()
  next()
}
*/
