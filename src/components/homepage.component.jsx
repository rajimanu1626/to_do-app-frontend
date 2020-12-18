import React from 'react'
import { Link } from "react-router-dom";
export default function HomePage() {
    return (
        <div>
            <h1 style={{padding:'2rem'}}>To Do App</h1>
            <div>
            <h2>New Users</h2>
            <Link to='/signup'>Signup</Link>
            </div>
            <div>
            <h2>Existing Users</h2>
            <Link to='/signin'>Login</Link>
            </div>
        </div>
    )
}
