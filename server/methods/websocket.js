const ws = require('ws')

//Создаем websocket сервер
const wss = new ws.Server({
    port: 5000
}, () => console.log(`Server started on 5000`))

//Работа с websocket
//ws - одно конкретное подключение(пользователь)
wss.on('connection', function connection(ws){
    ws.on('message', function (message){
        const report = JSON.parse(message)
        switch(report.event){
            case 'message':
                broadcastMessage(report)
                break
            case 'connection':
                broadcastMessage(report)
                break
        }
    })
})

//Функция, которая будет отправлять сообщение всем пользователям чата
function broadcastMessage(message){
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

const message = {
    event: 'message/connection',
    id: 123,
    date: '21.01.2022',
    username: 'Alex',
    message: 'Hello'
}