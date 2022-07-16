import React from 'react'
import './App.css';
import EventSourcing from './components/EventSourcing';
import LongPulling from './components/LongPulling';
import WebSock from './components/WebSocket';

function App() {
  return (
    <div>
      <WebSock/>
    </div>
  );
}

export default App;
