import React,{useState,useEffect,useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock} from '@fortawesome/free-regular-svg-icons';
import MyContext from '../../../context/MyContext';
function Most({mostSearched,height,id}) {
    const data = useContext(MyContext);
    const [most,setMost] = useState(mostSearched);
    const [height1,setHeight1] = useState(height);
    useEffect(() => {
        setMost(mostSearched);
    },[mostSearched])
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
    useEffect (() => {
        if(data.userLocation.geometry.coordinates.length ===2) {
            let temp = [];
            temp.push({
                type:"Feature",
                properties:{
                    id:0,
                    name:"Vị trí của tôi",
                },
                geometry:{
                    coordinates:data.userLocation.geometry.coordinates
                }
            })
            for(let i = 0 ; i < mostSearched.length ; i++) {
                temp.push(mostSearched[i])
            }
            setMost(temp);
            let t = mostSearched.find(a => a.properties.id === 0);
            if(!t) {
                mostSearched.push({
                    type:"Feature",
                    properties:{
                        id:0,
                        name:"Vị trí của tôi",
                    },
                    geometry:{
                        coordinates:data.userLocation.geometry.coordinates
                    }
                })
            }
            
        }
    },[])
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
                                    fetch('http://localhost:8080/admin/updateQuantity',{
                                        headers:{
                                            "Content-Type":"application/json"
                                        },
                                        method:"POST",
                                        body:JSON.stringify({
                                            arr:[{
                                                id:a.properties.id,
                                                qty_search: 1
                                            }]
                                        })
                                    }).then(res => res.json())
                                    .then(result => {})
                                    .catch(err => console.log(err)) 
                                    if(id === 'start') {
                                        data.setStart(a);
                                        if(data.prevIdStart.length  === 0) {
                                            if(document.getElementById(a.properties.id)) {
                                                
                                                document.getElementById(a.properties.id).style.animation = "click .5s infinite";
                                                document.getElementById(a.properties.id).style.color ="red";
                                                let temp = data.prevIdStart;
                                                temp.push(a.properties.id);
                                                data.setPrevIdStart(temp);
                                                console.log(a.properties.id);
                                            }
                                            
                                        } else {
                                            if(document.getElementById(data.prevIdStart[data.prevIdStart.length -1])) {
                                                document.getElementById(data.prevIdStart[data.prevIdStart.length -1]).style.animation = "none";
                                                document.getElementById(data.prevIdStart[data.prevIdStart.length -1]).style.color ="inherit";
                                            }
                                            if(document.getElementById(a.properties.id)) {
                                                document.getElementById(a.properties.id).style.animation = "click .5s infinite";
                                                document.getElementById(a.properties.id).style.color ="red";
                                                let temp = data.prevIdStart;
                                                temp.push(a.properties.id);
                                                data.setPrevIdStart(temp);
                                            }
                                            
                                        }
                                        data.direction.actions.setOriginFromCoordinates(a.geometry.coordinates);
                                    } else {
                                        data.setEnd(a);
                                        if(data.prevIdEnd.length  === 0) {
                                            if(document.getElementById(a.properties.id)) {
                                                document.getElementById(a.properties.id).style.animation = "click .5s infinite";
                                                document.getElementById(a.properties.id).style.color ="red";
                                                let temp = data.prevIdEnd;
                                                temp.push(a.properties.id);
                                                data.setPrevIdEnd(temp);
                                            }
                                            
                                        } else {
                                            if(document.getElementById(data.prevIdEnd[data.prevIdEnd.length -1])) {
                                                document.getElementById(data.prevIdEnd[data.prevIdEnd.length -1]).style.animation = "none";
                                                document.getElementById(data.prevIdEnd[data.prevIdEnd.length -1]).style.color ="inherit";
                                            }
                                            if(document.getElementById(a.properties.id)) {
                                                document.getElementById(a.properties.id).style.animation = "click .5s infinite";
                                                document.getElementById(a.properties.id).style.color ="red";
                                                let temp = data.prevIdEnd;
                                                temp.push(a.properties.id);
                                                data.setPrevIdEnd(temp);
                                            }
                                            
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
