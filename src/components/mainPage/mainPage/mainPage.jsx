import React, { useState, useEffect } from 'react';
import './mainPage.css'
import MainPageItem from './mainPageItem'
import axios from 'axios'


function MainPage() {

    const [packageItem, setPackage] = useState([])


    useEffect(() => {
        if (packageItem.length === 0) {
            axios.get('https://zerophone.herokuapp.com/phone/allpackages')
                .then((user) => {
                    if (user) {
                        setPackage(user.data)
                    }
                })
        }
    })


    let listItems = packageItem.map((item, index) => {
        return <MainPageItem key={index} props={item} />
    })


    return (

        <div>
            {/* <!-- Masthead --> */}
            <header className="masthead text-white text-center">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 mx-auto">
                            <h1>Zero-Phones the best deals in the World</h1>
                        </div>
                    </div>
                </div>
            </header><br /><br />

            {/* <!-- Icons Grid --> */}
            <div className="container">
                <div className="row">
                    {listItems}
                </div>
            </div>
        </div>
    )
}

export default MainPage


