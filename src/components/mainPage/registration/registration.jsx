import React, { useState } from 'react';
import './registration.css'
import axios from 'axios'
import { toast } from 'react-toastify';


function Registration() {

    const [user, setUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        adress: '',
        city: '',
        password: '',
        confirmPassword: '',
        birthDate: ''
    })

    let changeValue = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    let submit = (e) => {
        e.preventDefault();
        if (user.password === user.confirmPassword) {
            axios.post('https://zerophone.herokuapp.com/client/register', { data: user })

                .then((user) => {
                    //התראות של התחברות והתנתקות 
                    if (user) {
                        alert("register succsessfully")
                        window.location = '/'
                    }
                })
                .catch((err) => {
                    alert("Error Notification !")
                })
        }
        else {
            alert("password are not much try again")
        }
    }


    return (
        <div className="testbox">
            <h1>Registration</h1>

            <form action="/register" onSubmit={submit} method="POST">
                <div className="accounttype">
                    <input type="radio" name="isBuisness" value="false" onChange={changeValue} id="radioOne" required />
                    <label for="radioOne" className="radio" chec>Personal</label>
                    <input type="radio" name="isBuisness" value="true" onChange={changeValue} id="radioTwo" required />
                    <label for="radioTwo" className="radio">Company</label>
                </div>
                <label id="icon" for="name"><i className="icon-user"></i></label>
                <input type="text" name="firstName" placeholder="First Name" onChange={changeValue} placeholder=" First Name" required minLength="2" />
                <label id="icon" for="name"><i className="icon-user"></i></label>
                <input type="text" name="lastName" placeholder="Last Name" onChange={changeValue} placeholder="enter last name" required minLength="2" />
                <label id="icon" for="name"><i className="icon-user"></i></label>
                <input type="text" name="id" placeholder="id" required onChange={changeValue} minLength='9' maxLength='9' title="enter 9 digits" />
                <label id="icon" for="name"><i className="icon-time"></i></label>
                <input type="date" name="birthDate" placeholder="Birth Date" onChange={changeValue} required />
                <label id="icon" for="name"><i className="icon-home"></i></label>
                <input type="text" name="adress" placeholder="Address" onChange={changeValue} placeholder="enter address" required minLength="2" />
                <label id="icon" for="name"><i className="icon-home"></i></label>
                <input type="text" name="city" placeholder="City" onChange={changeValue} placeholder="enter city" required minLength="2" />
                <label id="icon" for="name"><i className="icon-shield"></i></label>
                <input type="password" name="password" placeholder="Password" onChange={changeValue} placeholder="enter password" required minLength="2" />
                <label id="icon" for="name"><i className="icon-shield"></i></label>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={changeValue} required />
                <p>By clicking Register, you agree on our <a href="#">terms and condition</a>.</p>
                <input type='submit' className="submit" value='Register'></input>

            </form>
        </div>
    )

}

export default Registration