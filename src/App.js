import React,{useState,useEffect,useContext} from 'react';
import './css/style.css';
import Sidebar1 from './components/Sidebar1/Sidebar1';
import MyContext from './context/MyContext';
import MapBox from './components/mapbox/Mapbox';
import Menu from './components/Menu/Menu';


function App() {
  const [mode,setMode] = useState(0);
  const [dataApi, setDataApi] = useState(null);
  const [isLoading,setLoading] = useState(false);
  const [prevIdEnd, setPrevIdEnd] = useState(null);
  const [prevIdStart,setPrevIdStart] = useState(null);
  const [geoLoc, setGeoLoc] = useState({
    "type":"FeatureCollection",
    "features":[
        
        {
            "type": "Feature",
            "properties": {
                "id": 1,
                "name": "Khu công nghệ cao",
                "description": "Khu công nghệ cao E1 dùng để học những môn đại cương",
                "image":"https://ibb.co/xX0qw9f"
            },
            "geometry": {
                "coordinates": [106.770524, 10.851386],
                "type": "Point",
                
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 2,
                "name": "Căn tin",
                "description": "Căn tin là nơi bạn có thể ăn trưa hoặc mua nước uống",
                "image":"https://ibb.co/xX0qw9f"
            },
            "geometry": {
                "coordinates": [106.77106, 10.85135],
                "type": "Point",
                
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 3,
                "name": "Synary",
                "description": "Synary là nơi ngồi học hoặc nói chuyện",
                "image":"https://ibb.co/xX0qw9f"
            },
            "geometry": {
                "coordinates": [106.771138, 10.851022],
                "type": "Point",
                
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 4,
                "name": "Photocopy",
                "description": "Photocopy",
                "image":"https://ibb.co/xX0qw9f"
            },
            "geometry": {
                "coordinates": [106.770904, 10.850893],
                "type": "Point",
                
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": 5,
                "name": "Tòa nhà trung tâm",
                "description": "Tòa nhà trung tâm",
                "image":"https://ibb.co/xX0qw9f"
            },
            "geometry": {
                "coordinates": [106.771973, 10.851025],
                "type": "Point",
                
            }
        },
        {
          "type": "Feature",
          "properties": {
              "id": 6,
              "name": "Ministop",
              "description": "Ministop là chỗ để mua đồ ăn, đồ uống,kem, có chỗ để học tập",
              "image":"https://ibb.co/xX0qw9f"
          },
          "geometry": {
              "coordinates": [106.771403,10.850104],
              "type": "Point",
              
          }
      }
        
    ]
});
  const [start,setStart] = useState({
    type:"Feature",
    properties:{
      id:null,
      name:null,
      description:null,
      image:null
    },
    geometry: {
      coordinates: [],
    }
  });
  const [end,setEnd] = useState({
    type:"Feature",
    properties:{
      id:null,
      name:null,
      description:null,
      image:null
    },
    geometry: {
      coordinates: [],
    }
  });
  const [direction , setDirection] = useState(null);
  useEffect(() => {
    setInterval(() => {
      let temp = JSON.parse(window.localStorage.getItem('data'));
      let tempStart = JSON.parse(window.localStorage.getItem('start'));
      let tempEnd = JSON.parse(window.localStorage.getItem('end'));
      if(temp) {
        setDataApi(temp);
        window.localStorage.removeItem('data');
      }
      
        if(tempStart) {
          console.log(prevIdStart);
          if(prevIdStart) {
              document.getElementById(prevIdStart).style.animation = "none";
              document.getElementById(prevIdStart).style.color ="inherit";
            }
          setPrevIdStart(null);
          let t = tempStart.map(a => Math.round(a * 10000)/10000 )
          setStart({
            ...start,
            geometry:{
              coordinates:t
            }
          });
          window.localStorage.removeItem('start');
          
        }
        if(tempEnd) {
          if(prevIdEnd) {
            document.getElementById(prevIdEnd).style.animation = "none";
            document.getElementById(prevIdEnd).style.color ="inherit";
          }
        setPrevIdEnd(null);
          let t = tempEnd.map(a => Math.round(a * 10000)/10000 )
          setEnd({
            ...end,
            geometry: {
              coordinates:t
            }
          });
          window.localStorage.removeItem('end');
        }
    },1000);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    },3000);
    
  },[])
  return (
    
    <MyContext.Provider value={{
      mode:mode,
      setMode:setMode,
      isLoading:isLoading,
      setLoading:setLoading,
      dataApi:dataApi,
      setDataApi:setDataApi,
      start:start,
      setStart:setStart,
      setEnd:setEnd,
      end:end,
      direction:direction,
      setDirection:setDirection,
      geoLoc:geoLoc,
      setGeoLoc:setGeoLoc,
      prevIdStart:prevIdStart,
      prevIdEnd:prevIdEnd,
      setPrevIdEnd:setPrevIdEnd,
      setPrevIdStart:setPrevIdStart
    }} >
      <div className="container">
        {(isLoading)?<div className="container-spinner">
          <div className="loader"></div>
        </div>:null}
        <Sidebar1 />
        <Menu/>
        <MapBox/>
      </div>
    </MyContext.Provider>
  );
}

export default App;
