import React,{useContext} from 'react';
import Search from './Search/Search';
import InvolveBar from './InvolveBar/InvolveBar';
import Most from './Most/Most';
import OnSideBar from '../OnSideBar/OnSideBar';
import MyContext from '../../context/MyContext';
import Direction from './Direction/Direction';
import Weather from './Weather/WeatherContainer';


function Sidebar1() {
    const data = useContext(MyContext);
    return (
        <div className="container-sidebar1" id="container-sidebar1" >
            <div className="sidebar1" id="sidebar1">
                {((data.mode % 2 === 0) && !(data.end.properties.name !== null || data.end.geometry.coordinates.length === 2))?<div className="container-search" id="search">
                    <Search/>
                    <Most id='start' mostSearched={data.geoLoc.features}/>
                </div>:<Direction/>}
                <Weather/>
                {((data.mode % 2 === 0) && !(data.end.properties.name !== null || data.end.geometry.coordinates.length === 2))?<InvolveBar/>:null}
            </div>
            <OnSideBar />
        </div>
    )
}

export default Sidebar1
