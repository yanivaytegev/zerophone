import React, { useState } from 'react';
import './package.css'
import Deals from '../../../photos/deals1.jpg'
import Buy from '../buy/buy'



function PackageItem({ props }) {

    const [packageItem, setPackage] = useState({
        name: props.packageName,
        minutes: props.callMinutes,
        internet: props.webService,
        price: props.packagePrice,
        abroad: props.callMinutesToAboard,
        active: props.isActive,
        showPopup: false
    })


    let togglePopup = () => {
        setPackage({
            name: props.packageName,
            minutes: props.callMinutes,
            internet: props.webService,
            price: props.packagePrice,
            abroad: props.callMinutesToAboard,
            active: props.isActive,
            showPopup: !packageItem.showPopup
        });
    }



    return (


        <div className='col-sm-4'>
            <div className="top-hotels bgnd-silver" >
                <a href="#" onClick={togglePopup} className="inblock">
                    {packageItem.showPopup ?
                        < Buy
                            closePopup={togglePopup}
                            props={packageItem}
                        />
                        : null
                    }
                    <div className="holidays-item inblock bgnd-white ele-anim-spd4">
                        <div className="destination-name txt-purple txt-center pstn-reltv"><label class="txt-bold inblock">{packageItem.name}</label></div>
                        <div className="holidays-item-image pstn-reltv">
                            <img className="offerImg lazyloaded" src={Deals} />
                        </div>
                        <div className="ai-trp-rating">
                            <p>minutes : {packageItem.minutes}</p>
                            <p>internet : {packageItem.internet}</p>
                            <p>abroad : {packageItem.abroad}</p>
                            <div class="deals-price pstn-reltv inblock">
                                <div class="price-now ">
                                    <span>${packageItem.price}<span class="price-small">.90</span></span>
                                </div>
                                <div className="view-deal bgnd-green txt-white inblock"><h1>{packageItem.name}</h1></div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div >
    )
}

export default PackageItem



