import React from 'react'

const Chat = () => {
    return (
        window.name.includes(['@']) ?
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
            <h1>{window.name}</h1>
        </div>
        :
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
            <h1>Chat</h1>
        </div>
    )
}

export default Chat;