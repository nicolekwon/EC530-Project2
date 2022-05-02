import React from 'react'

const Home = () => {
    return (
        window.name.includes(['@']) ?
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
            <h1>Welcome, {window.name}</h1>
        </div>
        :
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
            <h1>Home</h1>
        </div>
    )
}

export default Home;