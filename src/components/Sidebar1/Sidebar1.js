import React,{useContext,useEffect} from 'react';
import Search from './Search/Search';
import InvolveBar from './InvolveBar/InvolveBar';
import Most from './Most/Most';
import OnSideBar from '../OnSideBar/OnSideBar';
import MyContext from '../../context/MyContext';
import Direction from './Direction/Direction';
import Weather from './Weather/WeatherContainer';


function Sidebar1() {
    const data = useContext(MyContext);
    useEffect(() => {
        if(data.end.properties.name === null) {
            if(data.prevIdEnd.length> 0) {
                for(let i = 0 ; i< data.prevIdEnd.length;i++) {
                    if(document.getElementById(data.prevIdEnd[i])) {
                        document.getElementById(data.prevIdEnd[i]).style.animation="none";
                        document.getElementById(data.prevIdEnd[i]).style.color ="inherit";
                    }
                }
            }
        }
    },[data.end.geometry.coordinates])
    useEffect(() => {
        
            data.geoLoc.features.map(a=> {
                let clickSearch= () => {
                    data.direction.actions.clearOrigin();
                    if(data.prevIdStart.length === 0) {
                        document.getElementById(a.properties.id).style.animation = "click .5s infinite";
                        document.getElementById(a.properties.id).style.color ="red";
                        let temp = data.prevIdStart;
                        temp.push(a.properties.id);
                        data.setPrevIdStart(temp);
                    } else {
                        document.getElementById(data.prevIdStart[data.prevIdStart.length-1]).style.animation = "none";
                        document.getElementById(data.prevIdStart[data.prevIdStart.length-1]).style.color ="inherit";
                        document.getElementById(a.properties.id).style.animation = "click .5s infinite";
                        document.getElementById(a.properties.id).style.color ="red";
                        let temp = data.prevIdStart;
                        temp.push(a.properties.id);
                        data.setPrevIdStart(temp);
                    }
                    data.setStart(a);
                }
                if(document.getElementById(a.properties.name)) {
                    document.getElementById(a.properties.name).addEventListener('click', clickSearch)
                }
            })
    })
    
    return (
        <div className="container-sidebar1" id="container-sidebar1" >
            <div className="sidebar1" id="sidebar1">
                {((data.mode % 2 === 0) && !(data.end.properties.name !== null || data.end.geometry.coordinates.length === 2))?<div className="container-search" id="search">
                    <Search/>
                    <Most id='start' mostSearched={(data.geoLoc)?data.geoLoc.features:[]}/>
                </div>:<Direction/>}
                <Weather/>
                {((data.mode % 2 === 0) && !(data.end.properties.name !== null || data.end.geometry.coordinates.length === 2))?<InvolveBar/>:null}
            </div>
            <OnSideBar />
        </div>
    )
}

export default Sidebar1
