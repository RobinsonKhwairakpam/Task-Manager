const express = require("express")
const router = express.Router()
const Task = require("../models/Task.js")

//GET
router.get('/', async (req, res) => {
    const maxTasks = 8
    await Task.find()
            .limit(maxTasks)
            .then(result => res.render("index", {data : result}))
            .catch(err => console.log(err.message))
})

//POST
router.post('/add', async (req, res) => {
    const taskName = req.body.taskValue
    const task = new Task({
        task: taskName
    })
    await task.save()
        .then(() => res.redirect("/"))
        .catch(err => console.log(err.message))
})

//DELETE
router.delete('/delete/:id', (req, res) => {
    let id = req.params.id
    Task.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
        }else{
            console.log(data)
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    })
})

module.exports = router