const mongoose = require("mongoose");

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const URI = `mongodb+srv://arnaumas:${password}@cluster0.cweyg0h.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

const personSchema = new mongoose.Schema( {
    name: String,
    number: String
  })

const Person = mongoose.model("Person", personSchema) 

mongoose.set('strictQuery',false)

mongoose.connect(URI)
  .then(res => console.log("connected"))
  .catch(err => console.log(err))


if(process.argv.length===3){
    Person.find({})
        .then(res => {
            console.log(res)
            mongoose.connection.close()
        })
        .catch(err => console.log(err))
}
  
if(process.argv.length>3 && process.argv.length<6){
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    person.save()
        .then(res => {
            console.log(`added ${res.name} ${res.number} to phonebook`)
            mongoose.connection.close()
        })
        .catch(err => console.log(err))
}

