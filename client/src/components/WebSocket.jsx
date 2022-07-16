import { useState, useRef } from "react";
import axios from 'axios'
// import WebSocket from 'ws'

const WebSock = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const socket = useRef()
    const [connected, setConnected] = useState(false)
    const [username, setUsername] = useState('')

    function connect(){
        //Создаем новый объект сокета
        socket.current = new WebSocket('ws://localhost:5000')

        //Слушатель, который отработает в момент подключения
        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            //Отправляем сообщение на сервер
            socket.current.send(JSON.stringify(message))
        }
        //Слушатель, который отработает при получении сообщения
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
        //Слушатель, который отработает в момент отключения
        socket.current.onclose = () => {
            console.log('Socket закрыт')
        }
        //Слушатель, который отработает при ошибке
        socket.current.onerror = () => {
            console.log('Произошла ошибка')
        }
    }

    //Отправка сообщения на сервер
    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message))
        setValue('')
    }

    if(!connected){
        return(
            <div className="center">
                <div className="form">
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Введите имя"/>
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
        )
    }

    return(
        <div className="center">
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? <div className="connection_message">Пользователь {mess.username} подключился</div>
                                : <div className="message">{mess.username}. {mess.message}</div>
                            }
                        </div>    
                    )}
                </div>
            </div>
        </div>
    )
}

export default WebSock