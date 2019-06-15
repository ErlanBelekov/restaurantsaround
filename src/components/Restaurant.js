import React from 'react';
import '../styles/restaurant.css';

const Restaurant = props => {
    return (
        <a href={props.to} className="restaurant">
            <div className="r-image-wrapper">
                <img
                    className="r-image"
                    src={props.img}
                    alt=""
                />
            </div>
            <p className="r-name">{props.name}</p>
        </a>
    );
}

export default Restaurant;
