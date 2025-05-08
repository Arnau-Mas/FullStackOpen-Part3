const express = require('express')
require("dotenv").config()
const cors = require("cors");
const mongoose = require("mongoose")
const Person = require("./models/person")
var morgan = require('morgan')

const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan('tiny')) 

mongoose.connect(process.env.URI)
  .then(res => console.log("connected"))
  .catch(err => console.log(err))


app.get("/", (req,res) => {
    console.log("prova")
    res.send("<h1>Welcome to Arnau's backend!</h1>")
})

app.get("/api/people", (req,res) => {
    Person.find({})
      .then(people => res.json(people))
      .catch(err => res.status(400).end())
})

app.get("/api/person/:id", (req,res) => {
    const  id = req.params.id;
    Person.findById(id)
      .then(person => res.json(person))
      .catch(err => res.status(404).end())
})

app.delete("/api/person/:id", (req,res) => {
  const  id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.json(persons)
})

app.post("/api/people", (req,res) => {
  const data = req.body;
  
  if(!data.name || !data.number){
    return res.status(400).json({"error":"missing name or number"})
  }else{
    const person = new Person({
      name: data.name,
      number:data.number
    })

    person.save()
      .then(savedNote => res.json(savedNote))
  }

})

app.get("/info", (req,res) => {
    const reqTime = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${reqTime}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})