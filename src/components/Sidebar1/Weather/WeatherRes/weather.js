import React from 'react'

function weather(props) {
    return (
        <div className="container-weather">
            <div className="card">
                <div className="card-heading">
                    <p className="card-city">{props.city}</p>
                    <p className="card-deg">{props.temp_celsius}&deg;</p>
                    <p className="card-description">{props.description}</p>
                </div>
                <div className="card-api">
                    <h5 className="card-api__icon" >
                        <i className={`wi ${props.weatherIcon} display-1`} />
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default weather
