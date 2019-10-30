import React, { useState, useEffect } from 'react';
import axios from 'axios';



function PackageProfile({ item, parentDelete }) {


    const [user, setUser] = useState({

        packageName: '',
        callMinutes: '',
        callMinutesToAboard: '',
        webService: '',
        packagePrice: ''
    })


    useEffect(() => {
        if (user.packageName === '') {
            axios.post('https://zerophone.herokuapp.com/phone/package', { _id: item })
                .then((user) => {
                    if (user) {
                        setUser({
                            packageName: user.data.success.packageName,
                            callMinutes: user.data.success.callMinutes,
                            callMinutesToAboard: user.data.success.callMinutesToAboard,
                            webService: user.data.success.webService,
                            packagePrice: user.data.success.packagePrice,
                        })
                    }
                })
        }
    })


    let deletePackage = () => {
        axios.post('https://zerophone.herokuapp.com/client/deletePackage', { data: user.packageName })
            .then((user) => {
                if (user !== "bad") {
                    alert("package deleted")
                    parentDelete()
                    window.location = "./profile"
                } else {
                    alert("sorry we have problem write now you can delete the package in few minutes")
                }
            })
    }


    return (
        <div>
            packageName: {user.packageName}<br />
            callMinutes: {user.callMinutes}<br />
            callMinutesToAboard: {user.callMinutesToAboard}<br />
            webService: {user.webService}<br />
            packagePrice: {user.packagePrice}<br /><br />

            <div class="button_cont" align="center">
                <a class="example_d" onClick={() => {
                    deletePackage()
                }}
                    target="_blank" rel="nofollow noopener">
                    Delete Package</a>
            </div>
            <br />
        </div >
    )
}

export default PackageProfile



