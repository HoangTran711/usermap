import React,{useContext,useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt,faDirections,faBars } from '@fortawesome/free-solid-svg-icons';
import MyContext from '../../../context/MyContext';

function Search() {
    const data = useContext(MyContext);
    const clickOpen = () => {
        let w = window.innerWidth;
        document.querySelector(".container-menu").style.opacity = "1";
        document.querySelector(".container-menu").style.visibility = "visible";
        if(w > 1200) {
            document.querySelector(".menu").style.width = "24%";
        } else if  (w < 1200 && w > 900) {
            document.querySelector(".menu").style.width = "30%";
        } else if (w < 900) {
            document.querySelector(".menu").style.width = "50%";
        }
        
    }
    const turnMode = () => {
        data.setMode(data.mode + 1);
    }
    const changeStart = (e) => {
        data.setStart({...data.start,properties:{
            ...data.start.properties,
            name:e.target.value
        }});
    }
    const rotateTurn =  () => {
        let t = localStorage.getItem('rotate');
        if( (t !== 'true' && t!== 'false') || t === 'false' ) {
            localStorage.setItem('rotate',true);
        } else {
            localStorage.setItem('rotate',false);
        }
        document.location.reload();
        
    }
    const focusHandle = () => {
        document.getElementById("most").style.borderWidth ="1px";
        document.getElementById("most").style.borderStyle ="solid";
        document.getElementById("most").style.borderColor = "#BDBDBD";
        document.getElementById("most").style.borderTop = "none";
        document.getElementById("most").style.boxShadow = "0px 0px 8px 0px rgba(0,0,0,0.25)";
    }
    const blurHandle = () => {
        document.getElementById("most").style.display ="block";
        document.getElementById("most").style.border = "none";
        document.getElementById("most").style.boxShadow = "none";
    }
    return (
        <div className="search" id="search-input">
            <div className="search__icon-menu">
                <FontAwesomeIcon className="icon" icon={faBars} onClick={clickOpen} />
            </div>
            <input value={(data.start.properties.name !== null)?data.start.properties.name:data.start.geometry.coordinates.join(',')} id="input-start" placeholder="Choose a place..."  type="text" className="search__input" onChange={changeStart} onFocus={focusHandle} onBlur={blurHandle} />
            <div className="search__icon-search">
                <FontAwesomeIcon className="icon" icon={faSyncAlt} onClick={rotateTurn} />
            </div>
            <div className="search__icon-direction" onClick={turnMode}>
                <FontAwesomeIcon className="icon" icon={faDirections} />
            </div>
        </div>
    )
}

export default Search
