import React, { useState } from 'react';
import './login.css'
import axios from 'axios';


function Login() {

    const [user, setUser] = useState({
        id: '',
        password: '',
        userName: ''
    })

    let loginUser = (e) => {

        e.preventDefault()

        axios.post('https://zerophone.herokuapp.com/client/login', { data: user })
            .then((user) => {
                console.log('welcome dear' + user.data.firstName)
                window.location = '/'
            })
    }

    let changeValue = (e) => {

        setUser({ ...user, [e.target.name]: e.target.value })
    }


    return (
        <div >
        </div>
    )
}

export default Login






