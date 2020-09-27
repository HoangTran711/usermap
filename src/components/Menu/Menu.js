import React,{useContext,useState} from 'react';
import MyContext  from '../../context/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt,faSatellite, faMoon,faSun,faDirections,faMapSigns } from '@fortawesome/free-solid-svg-icons';

function Menu() {
    const data = useContext(MyContext);
    const [direction,setDirection] = useState(true)
    const clickClose = () => {
        document.querySelector(".menu").style.width = "0px";
        setTimeout(() => {
            document.querySelector(".container-menu").style.opacity = "0";
            document.querySelector(".container-menu").style.visibility = "hidden";
        },300);
    }
    const turnMode = () => {
        let t = localStorage.getItem('mode');
        if((t!== 'mapbox://styles/tranhoang071120/ckf8g7uwq5h7919pfzhlxzwqe' && t !== 'mapbox://styles/tranhoang071120/ckf2xr6kl05o21asu1omijgo9') || t ==="mapbox://styles/tranhoang071120/ckf2xr6kl05o21asu1omijgo9") {
            localStorage.setItem('mode',"mapbox://styles/tranhoang071120/ckf8g7uwq5h7919pfzhlxzwqe");
            document.location.reload();
        } else {
            localStorage.setItem('mode', "mapbox://styles/tranhoang071120/ckf2xr6kl05o21asu1omijgo9");
            document.location.reload();
        }
    }
    const turnDirection = () => {
        if(document.querySelector(".mapboxgl-ctrl-directions").style.opacity !== '0') {
            document.querySelector(".mapboxgl-ctrl-directions").style.opacity='0';
            document.querySelector(".mapboxgl-ctrl-directions").style.visibility = "hidden";
            setDirection(false);
        } else {
            setDirection(true);
            document.querySelector(".mapboxgl-ctrl-directions").style.opacity=1;
            document.querySelector(".mapboxgl-ctrl-directions").style.visibility = "visible";
        }
        
    }
    return (
        <div className="container-menu" onClick={clickClose}>
            <div className="menu">
                <div className="menu__heading">
                    <h1 className="heading-primary">UTE</h1>
                    <h1 className="heading-maps">Maps</h1>
                </div>
                
                <ul className="menu__list">
                    <li className="menu__list__active">
                        <div className="menu__list__item-icon">
                            <FontAwesomeIcon icon={faMapMarkedAlt}/>
                        </div>
                        <p className="menu__list__item-text">Bản đồ</p>
                    </li>
                    <li className="menu__list__item">
                        <div className="menu__list__item-icon">
                            <FontAwesomeIcon icon={faSatellite}/>
                        </div>
                        <a className="menu__list__item-link" href={(data.start.properties.name !== null && data.start.properties.name !== '')?`https://map.harrisstudio.org/virtualtour/index.html?name="${data.start.properties.name}"`:"https://map.harrisstudio.org/virtualtour/index.html?name=%22C%E1%BB%95ng%20ch%C3%ADnh%22"} target="_blank">Vệ tinh</a>
                    </li>
                    <li className="menu__list__item" onClick={turnMode}>
                        {(localStorage.getItem('mode') === 'mapbox://styles/tranhoang071120/ckf2xr6kl05o21asu1omijgo9' || (localStorage.getItem('mode')!== 'mapbox://styles/tranhoang071120/ckf8g7uwq5h7919pfzhlxzwqe' && localStorage.getItem('mode')!== 'mapbox://styles/tranhoang071120/ckf2xr6kl05o21asu1omijgo9'))?
                        (
                            <React.Fragment>
                                <div className="menu__list__item-icon">
                                    <FontAwesomeIcon icon={faMoon}/>
                                </div>
                                <p  className="menu__list__item-text">Chế độ tối</p>
                            </React.Fragment>
                        ):
                        (
                            <React.Fragment>
                                <div className="menu__list__item-icon">
                                    <FontAwesomeIcon icon={faSun}/>
                                </div>
                                <p className="menu__list__item-text">Chế độ sáng</p>
                            </React.Fragment>
                        )
                        }
                    </li>
                    <li className="menu__list__item" onClick={turnDirection}>
                        {
                            (direction)?
                            (<React.Fragment>
                                <div className="menu__list__item-icon">
                                    <FontAwesomeIcon icon={faMapSigns}/>
                                </div>
                                <p className="menu__list__item-text">Tắt chỉ đường</p>
                            </React.Fragment>):
                            <React.Fragment>
                                <div className="menu__list__item-icon">
                                    <FontAwesomeIcon icon={faDirections}/>
                                </div>
                                <p className="menu__list__item-text">Bật chỉ đường</p>
                            </React.Fragment>
                        }
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Menu
