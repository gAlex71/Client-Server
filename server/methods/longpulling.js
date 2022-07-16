const express = require('express')
const cors = require('cors')
const events = require('events')
const PORT = 5000

//Event Emitter - с помощью него мы можем управлять событиями(регистрировать, подписываться, вызывать)
const emitter = new events.EventEmitter()

const app = express()

app.use(cors())
app.use(express.json())
//Получение сообщений
//В параметры принимаем маршрут, и callback, который будет отрабатывать по этому маршруту(запрос, ответ)
app.get('/get-messages', (req, res) => {
    //1.Осведомляем участников чата, о том, что пользователь отправил сообщение
    emitter.once('newMessage', (message) => {
        res.json(message)
    })
})
// Отправка сообщений
app.post('/new-messages', (req, res) => {
    //1.Создаем сообщение
    const message = req.body
    //Отправляем сообщение в callback
    emitter.emit('newMessage', message)
    res.status(200)
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))