const express = require('express')
var morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(morgan('tiny')) 

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/", (req,res) => {
    console.log("prova")
    res.send("<h1>Welcome to Arnau's backend!</h1>")
})

app.get("/api/persons", (req,res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req,res) => {
    const  id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if(person){
        return res.json(person)
    }else{
       return res.status(404).end()
    }
})

app.delete("/api/person/:id", (req,res) => {
  const  id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.json(persons)
})

app.post("/api/persons", (req,res) => {
  const data = req.body;

  if(!data.name || !data.number){

    return res.status(400).json({"error":"missing name or number"})

  }
  const nameExists = persons.find(person => person.name === data.name)

  if(nameExists){
    //I searched for the correct error code to use when a duplicate entry is submitted.
    return res.status(409).json({"error":"name must be unique"})
  }
  else{

    const newPerson = {
      id: Math.floor(Math.random() * 1000000),
      name:data.name,
      number:data.number
    }
    persons.push(newPerson)
    return res.json(newPerson)
  }

})

app.get("/info", (req,res) => {
    const reqTime = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${reqTime}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
