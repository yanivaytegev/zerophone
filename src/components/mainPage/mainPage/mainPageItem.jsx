import React, { useState } from 'react';
import './mainPage.css'
import Deals1 from '../../../photos/deals1.jpg'
import Buy from '../buy/buy'


function MainPageItem({ props }) {

    const [item, setItem] = useState({
        name: props.packageName,
        minutes: props.callMinutes,
        internet: props.webService,
        price: props.packagePrice,
        abroad: props.callMinutesToAboard,
        active: props.isActive
    })


    let togglePopup = () => {
        setItem({
            name: props.packageName,
            minutes: props.callMinutes,
            internet: props.webService,
            price: props.packagePrice,
            abroad: props.callMinutesToAboard,
            active: props.isActive,
            showPopup: !item.showPopup
        });
    }


    return (

        <div className="col-sm-4">
            {item.showPopup ?
                < Buy
                    closePopup={togglePopup}
                    props={item}
                />
                : null
            }
            <div className="profile-card">
                <img src={Deals1} />
                <div className="profile-card__info">
                    <h1>{item.name}</h1>
                    <p>minutes : {item.minutes}</p>
                    <p>internet : {item.internet}</p>
                    <p><button className='btn1' onClick={togglePopup} >buy</button> </p>
                </div>
            </div>
            <br /><br />
        </div >
    )
}

export default MainPageItem


