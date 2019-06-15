import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        return (
            <div className="global-wrapper center">
                <img
                    src="https://image.flaticon.com/icons/svg/1594/1594214.svg"
                    className="not-found-icon"
                    alt=""
                />
                <h1 className="not-found-title">Whoopsie! Couldn't find this page ;(</h1>
                <a href={process.env.PUBLIC_URL} className="back-home">Back Home</a>
            </div>
        );
    }
}

export default NotFound;
