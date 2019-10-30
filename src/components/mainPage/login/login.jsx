import React, { useState } from 'react';
import './login.css'
import axios from 'axios';



function Login() {

    const [user, setUser] = useState({
        id: '',
        password: '',
        adminLogin: false
    })

    let loginUser = (e) => {

        e.preventDefault()
        console.log(user.adminLogin)
        if (user.adminLogin) {
            axios.post('http://localhost:3000/admin/login', { data: user })
                .then((user) => {
                    if (user.data.isActive) {
                        alert(" admin login successfully")
                        window.location = '/'
                    }
                    else {
                        alert("Error Notification !")
                    }
                })

        } else {
            axios.post('https://zerophone.herokuapp.com/client/login', { data: user })
                .then((user) => {
                    if (user.data.isActive) {
                        alert("login successfully")
                        window.location = '/'
                    }
                    else {
                        alert("Error Notification !")
                    }
                })
        }
    }

    let changeValue = (e) => {

        setUser({ ...user, [e.target.name]: e.target.value })
        setUser({ ...user, adminLogin: !user.adminLogin })
    }


    return (
        <div><br /><br />
            < div className='testbox' >

                <form onSubmit={loginUser} role="form" className="form-signin">
                    <h2>Please sign in...</h2>
                    < div className="form-group" >
                        <label for="EmailAddress"><span>*</span>ID/User Name</label>
                        <input type="id" onClick={changeValue} className="form-control" name="id" id="id" aria-required="true" aria-invalid="true" required minLength='9' maxLength='25' />
                    </div>

                    <div className="form-group">
                        <label for="EmailAddress"><span>*</span> Password</label>
                        <input type="password" onChange={changeValue} className="form-control" name="password" id="password" aria-required="true" aria-invalid="true" required />
                    </div>

                    <div className="checkbox">
                        <label>
                            <input type="checkbox" onChange={changeValue} name="adminLogin" id="adminLogin" checked={user.adminLogin} />
                            Admin login
                                </label>
                    </div>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </div >

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    )
}

export default Login






