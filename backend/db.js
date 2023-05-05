const mongoose = require('mongoose')
// const mongoURI = "mongodb://localhost:27017"
const mongoURI = "mongodb+srv://utsav5679:utsav5679@cluster1.x78ebip.mongodb.net/?retryWrites=true&w=majority"
const connnectToMongo = () => {
    mongoose.connect(mongoURI, () =>{
        console.log("connected to Mongo")
    })
}

module.exports = connnectToMongo