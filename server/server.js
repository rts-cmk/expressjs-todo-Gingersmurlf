import express from "express"
import cors from "cors"
import fs from "fs"
import path from "path"

const PORT = 6767

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send(`<div>holy skibidi</div>`)
})

app.post("/indhold/sigma", (req, res) => {
    const { title } = req.body
    console.log(__dirname);
    
    fs.readFile(path.join(__dirname, "todo.json"), "utf-8", (err, data) => {
        if (err) {
            return res.json({ error: "den kan ikke læse indholdet lil bro 💀🥷🥷" })
        }

        const superData = JSON.parse(data)


        const newLastId = superData.lastId + 1

        const newTodo = {
            id: newLastId,
            title: title,
            status: false,
        }

        superData.todos.push(newTodo)
        superData.lastId = newLastId

        fs.writeFile("todo.json", JSON.stringify(superData, null, 2), (err) => {
            if (err) {
                res.json({ error: "jaer, den gider ikke at gemme dawg 🍔" })
            }
            res.json({ message: "det virker, ny todo!!!" })
        })
    })


})

app.put("/todo/:id", (req, res) => {
    const id = req.params.id
    const { status } = req.body
    fs.readFile("todo.json", "utf-8", (err, data) => {
        if (err) {
            return res.json({ error: "kan ikke forstå id" })
        }
        const fileData = JSON.parse(data)

        const findId = fileData.todos.findIndex((todo) => todo.id == id)

        if (findId == -1) {
            res.status(404)
            return res.json({ err: "fejl på id" })
        }

        const oldTodo = fileData.todos[findId]

        const updatedTodo = {
            ...oldTodo,
            status: status
        }

        fileData.todos[findId] = updatedTodo

        fs.writeFile("todo.json", JSON.stringify(fileData, null, 2), (err) => {
            if (err) {
                return res.json({ err: "id kan ikke updateres" })
            }
            return res.json(updatedTodo)
        })

    })

})

app.delete("/todo/delete/:id", (req, res) => {
    const id = req.params.id
    fs.readFile("todo.json", "utf-8", (err, data) => {
        if (err) {
            return res.json({ err: "jaer gg, du cooked" })
        }
        const fileData = JSON.parse(data)

        const findId = fileData.todos.findIndex((todo) => todo.id == id)

        if (findId == -1) {
            res.status(404)
            return res.json({ err: "fejl på delete id" })
        }

        fileData.todos.splice(findId, 1)

        fs.writeFile("todo.json", JSON.stringify(fileData, null, 2), (err) => {
            if (err) {
                return res.json({ err: "du dum din kost" })
            }
            return res.json({ message: "Todo deleted successfully" })
        })
    })
})

app.get("/todos", (req, res) => {
    fs.readFile("todo.json", (err, data) => {
        if (err) {
            res.json({ error: "den kan ikke læse indholdet lil bro 💀🥷🥷" })
        }
        const superData = JSON.parse(data)
        res.send(superData)
    })

})

app.listen(PORT, (err) => {
    if (err) return console.log(err)
    console.log(`starting cool server on localhost:${PORT}`)
})