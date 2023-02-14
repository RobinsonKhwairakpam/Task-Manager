const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()


//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))
app.set("view engine", "ejs")       //use ejs view engine
app.use(express.static("public"))  //serve static files like css, html, etc


//routes
const taskRoutes = require("./routes/tasks.js")
app.use('/', taskRoutes)


//MongoDB connection & server configs
const PORT = 4000 || process.env.PORT
const CONNECTION_URL = "mongodb+srv://Robson:octoberzz@cluster0.3hjglkd.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL, { useNewUrlParser : true , useUnifiedTopology : true})
    .then(() => app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    }))
    .catch((err) => console.log(err.message))



