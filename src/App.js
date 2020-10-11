import React, { useState, useEffect, useContext } from "react";
import "./css/style.css";
import Sidebar1 from "./components/Sidebar1/Sidebar1";
import MyContext from "./context/MyContext";
import MapBox from "./components/mapbox/Mapbox";
import Menu from "./components/Menu/Menu";

function App() {
  const [mode, setMode] = useState(0);
  const [dataApi, setDataApi] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [prevIdEnd, setPrevIdEnd] = useState([]);
  const [prevIdStart, setPrevIdStart] = useState([]);
  const [eventLis, setEventLis] = useState(null);
  const [geoLoc, setGeoLoc] = useState(null);
  const [userLocation, setUserLocation] = useState({
    geometry: {
      coordinates: [],
    },
  });
  const [start, setStart] = useState({
    type: "Feature",
    properties: {
      id: null,
      name: null,
      description: null,
      image: null,
    },
    geometry: {
      coordinates: [],
    },
  });
  const [end, setEnd] = useState({
    type: "Feature",
    properties: {
      id: null,
      name: null,
      description: null,
      image: null,
    },
    geometry: {
      coordinates: [],
    },
  });
  const [direction, setDirection] = useState(null);
  const [test, setTest] = useState(null);
  useEffect(() => {
    var t;
    if (geoLoc) {
      clearInterval(t);
    } else {
      t = setInterval(() => {
        fetch("https://utemap.com/admin")
          .then((res) => res.json())
          .then((result) => {
            for (let i = 0; i < result.features.length; i++) {
              for (let j = i + 1; j < result.features.length; j++) {
                if (
                  result.features[i].properties.qty_search <
                  result.features[j].properties.qty_search
                ) {
                  let temp = result.features[i];
                  result.features[i] = result.features[j];
                  result.features[j] = temp;
                }
              }
            }
            console.log(result.features);
            setGeoLoc({
              type: "FeatureCollection",
              features: result.features,
            });
          });
      }, 1000);
      setTest(t);
    }
    return () => {
      clearInterval(t);
    };
  }, [geoLoc]);
  useEffect(() => {
    fetch("https://utemap.com/admin")
      .then((res) => res.json())
      .then((result) => {
        for (let i = 0; i < result.features.length; i++) {
          for (let j = i + 1; j < result.features.length; j++) {
            if (
              result.features[i].properties.qty_search <
              result.features[j].properties.qty_search
            ) {
              let temp = result.features[i];
              result.features[i] = result.features[j];
              result.features[j] = temp;
            }
          }
        }
        console.log(result.features);
        setGeoLoc({
          type: "FeatureCollection",
          features: result.features,
        });
      });
    setInterval(() => {
      let temp = JSON.parse(window.localStorage.getItem("data"));
      let tempStart = JSON.parse(window.localStorage.getItem("start"));
      let tempEnd = JSON.parse(window.localStorage.getItem("end"));
      if (temp) {
        setDataApi(temp);
        window.localStorage.removeItem("data");
      }

      if (tempStart) {
        let t = tempStart.map((a) => Math.round(a * 10000) / 10000);
        setStart({
          ...start,
          geometry: {
            coordinates: t,
          },
        });
        window.localStorage.removeItem("start");
      }
      if (tempEnd) {
        let t = tempEnd.map((a) => Math.round(a * 10000) / 10000);
        setEnd({
          ...end,
          geometry: {
            coordinates: t,
          },
        });
        window.localStorage.removeItem("end");
      }
    }, 1000);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <MyContext.Provider
      value={{
        mode: mode,
        setMode: setMode,
        isLoading: isLoading,
        setLoading: setLoading,
        dataApi: dataApi,
        setDataApi: setDataApi,
        start: start,
        setStart: setStart,
        setEnd: setEnd,
        end: end,
        direction: direction,
        setDirection: setDirection,
        geoLoc: geoLoc,
        setGeoLoc: setGeoLoc,
        prevIdStart: prevIdStart,
        prevIdEnd: prevIdEnd,
        setPrevIdEnd: setPrevIdEnd,
        setPrevIdStart: setPrevIdStart,
        eventLis: eventLis,
        setEventLis: setEventLis,
        userLocation: userLocation,
        setUserLocation: setUserLocation,
      }}
    >
      {geoLoc ? (
        <div className="container">
          {isLoading ? (
            <div className="container-spinner">
              <div className="loader"></div>
            </div>
          ) : null}
          <Sidebar1 />
          <Menu />
          <MapBox />
        </div>
      ) : null}
    </MyContext.Provider>
  );
}

export default App;
