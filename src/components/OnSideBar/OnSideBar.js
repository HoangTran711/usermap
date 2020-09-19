import React,{useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight} from '@fortawesome/free-solid-svg-icons';
import MyContext from '../../context/MyContext';

function OnSideBar() {
    const data = useContext(MyContext);
    const clickTurn = () => {
        const temp = document.getElementById("sidebar1").style.width;
        if(temp !== '0px') {
            document.getElementById("sidebar1").style.width = "0";
            document.getElementById("icon").style.transform="rotate(540deg)";
            document.getElementById("container-sidebar1").style.width = '3%';
            if(data.mode %2 === 0) {
                document.getElementById("container-sidebar1").style.width = '3%';
                document.getElementById("search").style.opacity = '0';
                document.getElementById("search").style.visibility = 'hidden';
            } else {
                
            }
        } else {
            if(data.mode %2 === 0) {
                document.getElementById("container-sidebar1").style.width = '35%';
                document.getElementById("search").style.opacity = '1';
                document.getElementById("search").style.visibility = 'visible';
            }
            document.getElementById("container-sidebar1").style.width = '35%';
            document.getElementById("sidebar1").style.width = "100%";
            document.getElementById("icon").style.transform="rotate(0deg)";
        }
    }
    return (
        <div className="on-side-bar" onClick={clickTurn}>
            <FontAwesomeIcon icon={faCaretRight} className="icon" id="icon"/>
        </div>
    )
}

export default OnSideBar
