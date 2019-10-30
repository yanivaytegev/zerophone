import React, { useState, useEffect } from 'react';
import PackageItem from './packageItem'
import './package.css'
import axios from 'axios'



function Package() {

    const [packages, setPackage] = useState([])



    useEffect(() => {
        if (packages.length === 0) {
            axios.get('https://zerophone.herokuapp.com/phone/allpackages')
                .then((user) => {
                    if (user) {
                        setPackage(user.data)
                    }
                })
        }
    })

    let listPackages = packages.map((item, index) => {
        return <PackageItem
            key={index}
            props={item}
        />

    })


    return (
        <div >
            <h1 className="testbox">All Deals We Offer</h1>
            {listPackages}
        </div >
    )
}





export default Package