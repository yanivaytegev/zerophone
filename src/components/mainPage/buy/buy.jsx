import React from 'react';
import './buy.css'
import axios from 'axios';



function Buy({ closePopup, props }) {


    let addPackage = (e) => {

        axios.post('https://zerophone.herokuapp.com/client/addline', { data: props.name })
            .then((user) => {
                if (user.data.err === "please login") {
                    alert("please login first")
                }
                else {
                    alert("thank you for buying with Zero-Phone")
                }
            })
        closePopup()

    }


    return (
        <div className='popup'>
            <div className='popup\_inner'>
                <h1>{props.name}</h1>
                <div className="testbox">
                    <div className="card">
                        <div className="card-head">
                            <div className="product-detail">
                                <h3>minutes : {props.minutes}</h3>
                                <h3>abroad : {props.abroad}</h3>
                                <h3>internet : {props.internet}</h3>
                            </div>
                            <span className="back-text">
                                {props.name}
                            </span>
                        </div>
                        <div className="card-body">
                            <div className="product-desc">
                                <span className="product-title">
                                    <b>{props.name}</b>
                                    <span className="badge">
                                        New
                                    </span>
                                </span>
                                <span className="product-rating">
                                    <i className="fa fa-star yellow"></i>
                                    <i className="fa fa-star yellow"></i>
                                    <i className="fa fa-star yellow"></i>
                                    <i className="fa fa-star yellow"></i>
                                    <i className="fa fa-star ash "></i>
                                </span>
                            </div>
                            <button className='myButton' onClick={addPackage} >Purchase</button>
                            <span className="product-price">
                                USD<b>{props.price}$</b>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Buy


