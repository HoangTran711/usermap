import React,{useState,useEffect,useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock} from '@fortawesome/free-regular-svg-icons';
import MyContext from '../../../context/MyContext';
function Most({mostSearched,height,id}) {
    const data = useContext(MyContext);
    const [most,setMost] = useState(mostSearched);
    const [height1,setHeight1] = useState(height);
    useEffect(()=>{
        if(id === 'start') {
            if(data.start.properties.name !== null) {
                let temp = mostSearched.filter((a) => {
                    return a.properties.name.toLowerCase().indexOf(data.start.properties.name.toLowerCase())!== -1;
                })
                setMost(temp);
            }
        } else {
            if(data.end.properties.name !== null) {
                
                let temp = mostSearched.filter((a) => {
                    return (a.properties.name.toLowerCase().indexOf(data.end.properties.name.toLowerCase())!== -1);
                })
                setMost(temp);
            }
        }
    },[data.start.properties.name,data.end.properties.name]);
    useEffect(() => {
        setHeight1(height);
    },[height])
    return (
        <div style={{
            height:height1
        }} className="most">
            <ul className="most__list" id="most"> 
                {
                    most.map((a,index) => {
                        if(index <=3) {
                            return (
                                <div key={index} onClick={() => {
                                    if(id === 'start') {
                                        data.setStart(a);
                                        if(data.prevIdStart === null) {
                                            document.getElementById(a.properties.name).style.animation = "click .5s infinite";
                                            document.getElementById(a.properties.name).style.color ="red";
                                            data.setPrevIdStart(a.properties.name);
                                        } else {
                                            document.getElementById(data.prevIdStart).style.animation = "none";
                                            document.getElementById(data.prevIdStart).style.color ="inherit";
                                            document.getElementById(a.properties.name).style.animation = "click .5s infinite";
                                            document.getElementById(a.properties.name).style.color ="red";
                                            data.setPrevIdStart(a.properties.name);
                                        }
                                        data.direction.actions.setOriginFromCoordinates(a.geometry.coordinates);
                                    } else {
                                        data.setEnd(a);
                                        if(data.prevIdEnd === null) {
                                            document.getElementById(a.properties.name).style.animation = "click .5s infinite";
                                            document.getElementById(a.properties.name).style.color ="red";
                                            data.setPrevIdEnd(a.properties.name);
                                        } else {
                                            document.getElementById(data.prevIdEnd).style.animation = "none";
                                            document.getElementById(data.prevIdEnd).style.color ="inherit";
                                            document.getElementById(a.properties.name).style.animation = "click .5s infinite";
                                            document.getElementById(a.properties.name).style.color ="red";
                                            data.setPrevIdEnd(a.properties.name);
                                        }
                                        data.direction.actions.setDestinationFromCoordinates(a.geometry.coordinates);
                                    }
                                }}  className="most__list__container-item">
                                    <div className="most__list__icon">
                                        <FontAwesomeIcon className="icon" icon={faClock}/>
                                    </div>
                                    <li className="most__list__item">{a.properties.name}</li>
                                </div>
                            )
                        }
                    })
                }
            </ul>
        </div>
    )
}

export default Most
