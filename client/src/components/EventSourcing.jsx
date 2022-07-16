import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";

const EventSourcing = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        subscribe()
    },[])

    //Подписываемся на получение сообщений
    const subscribe = async () => {
        const eventSource = new EventSource(`http://localhost:5000/connect`)
        eventSource.onmessage = function(event){
            //Получаем json строку(сообщение, id)
            // console.log(event.data)
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }
    }

    //Отправка сообщения на сервер
    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
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
                        <div className="message" key={mess.id}>
                            {mess.message}
                        </div>    
                    )}
                </div>
            </div>
        </div>
    )
}

export default EventSourcing