import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './navbar.css'
import MainPage from '../../mainPage/mainPage/mainPage';
import Registration from '../../mainPage/registration/registration';
import Login from '../../mainPage/login/login';
import Profile from '../../mainPage/profile/profile'
import AllDeals from '../../mainPage/allDelas/package'
import axios from 'axios';

function Navbar() {

    const [user, setUser] = useState({

        userId: '',
        userName: '',
        lastName: '',
        isLogged: false
    })

    axios.get('https://zerophone.herokuapp.com/client/me')
        .then((result) => {
            if (result.data !== '') {
                if (result.data.user.userId !== user.userId) {
                    setUser({
                        userId: result.data.user.userId,
                        userName: result.data.user.firstName,
                        lastName: result.data.user.lastName,
                    })
                }
            }
        })


    let logout = () => {
        axios.get('https://zerophone.herokuapp.com/client/logout')
            .then((result) => {
                window.location = '/'
            })
    }

    let lout = ''

    if (user.userId === '') {
        lout = <ul className="nav navbar-nav navbar-right">
            <li className="hidden active">
                <Link to="/">Main Page</Link>
            </li>
            <li className="">
                <Link to="/login">login</Link>
            </li>
            <li className="">
                <Link to="/register">Registration</Link>
            </li>
            <li className="">
                <Link to="/allDeals">All Deals</Link>
            </li>
        </ul>
    }
    else {
        lout = <ul className="nav navbar-nav navbar-right">
            <li className="hidden active">
                <Link to="/">Main Page</Link>
            </li>
            <li className="">
                <Link to="/" onClick={logout}>logout  </Link>
            </li>
            <li className="">
                <Link to="/profile">Profile</Link>
            </li>
            <li className="">
                <Link to="/allDeals">All Deals</Link>
            </li>
        </ul>

    }

    return (
        <Router>
            <div>
                {/* <!-- Navigation --> */}
                < nav className="navbar navbar-default navbar-fixed-top navbar-shrink" >
                    <div className="container">
                        {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                        <div className="navbar-header page-scroll">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand page-scroll" href="/">Zero-Phone</a>
                            <div className="navbar-brand page-scroll">hello {user.userName} {user.lastName}</div>

                        </div>

                        {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            {lout}
                        </div>
                    </div>
                </nav >
            </div>
            <br /> <br />
            <div>
                <Route path="/" exact component={MainPage} />
                <Route path="/register" component={Registration} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
                <Route path="/allDeals" component={AllDeals} />
            </div>
        </Router >
    )
}


export default Navbar;



