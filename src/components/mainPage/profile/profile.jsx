import React, { useState, useEffect } from 'react';
import PackageProfile from "./packageProfile";
import './profile.css'
import axios from "axios";




function PersonalArea() {

    const [profile, setProfile] = useState({
        id: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        date: '',
        package: []
    })

    useEffect(() => {
        axios.get('https://zerophone.herokuapp.com/client/me')
            .then((user) => {
                if (user && profile.id !== user.data.user.id) {
                    setProfile({
                        id: user.data.user.id,
                        firstName: user.data.user.firstName,
                        lastName: user.data.user.lastName,
                        address: user.data.user.adress,
                        city: user.data.user.city,
                        date: user.data.user.birthDate,
                        package: user.data.user.package
                    })
                }
            })
    })

    let refreshState = () => {
        axios.get('https://zerophone.herokuapp.com/client/me')
            .then((user) => {
                if (user && profile.id === user.data.user.id) {
                    setProfile({
                        id: user.data.user.id,
                        firstName: user.data.user.firstName,
                        lastName: user.data.user.lastName,
                        address: user.data.user.adress,
                        city: user.data.user.city,
                        date: user.data.user.birthDate,
                        package: user.data.user.package
                    })
                }
            })
    }

    let list = profile.package.map((item, index) => {
        return <PackageProfile key={index} item={item} parentDelete={refreshState} />
    })



    let deleteClient = () => {
        axios.post('https://zerophone.herokuapp.com/client/deletClient')
            .then((user) => {
                alert("delete succsessfully")
                window.location = '/'
            })

    }

    return (
        <div className="testbox">
            {console.log(profile)}
            <div className="card card-one">
                <header>
                    <div className="avatar">
                        <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="Jhon Doe" />
                    </div>
                </header>
                <h3>{profile.firstName} {profile.lastName}</h3>
                <div className="desc">
                    Address : {profile.address}<br />
                    City : {profile.city}<br />
                    Birth Date : {profile.date}<br />
                    Packages :<br /> {list} <br />
                </div>
                <div class="contacts">
                    <a href=""><i className="fa fa-plus"></i></a>
                    <a href=""><i className="fa fa-whatsapp"></i></a>
                    <a href=""><i className="fa fa-envelope"></i></a>
                    <div className="clear"></div>
                </div>

                <footer>
                    <div class="button_cont" align="center">
                        <a class="example_d" onClick={deleteClient} target="_blank" rel="nofollow noopener">
                            Delete User</a>
                    </div>
                </footer>
            </div>
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        </div >
    )
}



export default PersonalArea