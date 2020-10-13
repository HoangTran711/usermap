import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDirections,
  faBars,
  faTimes,
  faMapMarkerAlt,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import MyContext from '../../../context/MyContext';
import Most from '../Most/Most';

function Direction() {
  const data = useContext(MyContext);
  const [height, setHeight] = useState('0rem');
  const [height1, setHeight1] = useState('0rem');
  const clickOpen = () => {
    let w = window.innerWidth;
    document.querySelector('.container-menu').style.opacity = '1';
    document.querySelector('.container-menu').style.visibility = 'visible';
    if (w > 1200) {
      document.querySelector('.menu').style.width = '24%';
    } else if (w < 1200 && w > 900) {
      document.querySelector('.menu').style.width = '30%';
    } else if (w < 900) {
      document.querySelector('.menu').style.width = '50%';
    }
  };
  const turnMode = () => {
    if (data.prevIdEnd.length > 0) {
      for (let i = 0; i < data.prevIdEnd.length; i++) {
        if (document.getElementById(data.prevIdEnd)) {
          document.getElementById(data.prevIdEnd).style.animation = 'none';
          document.getElementById(data.prevIdEnd).style.color = 'inherit';
        }
      }
    }
    data.setMode(data.mode + 1);
    data.setEnd({
      type: 'Feature',
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
    data.direction.actions.clearDestination();
  };
  const changeStart = (e) => {
    data.setStart({
      ...data.start,
      properties: {
        ...data.start.properties,
        name: e.target.value,
      },
    });
  };
  const changeEnd = (e) => {
    data.setEnd({
      ...data.end,
      properties: {
        ...data.end.properties,
        name: e.target.value,
      },
    });
  };
  const clickConvert = () => {
    let temp = data.start;
    data.setStart(data.end);
    data.setEnd(temp);
    data.direction.actions.reverse();
  };
  const focusHandle = () => {
    setHeight('16rem');
  };
  const blurHandle = () => {
    setHeight('0rem');
  };
  const focusHandle1 = () => {
    setHeight1('16rem');
  };
  const blurHandle1 = () => {
    setHeight1('0rem');
  };
  return (
    <div className="container-direction">
      <div className="direction">
        <div className="direction__icon">
          <div className="direction__icon-menu">
            <FontAwesomeIcon
              className="icon"
              icon={faBars}
              onClick={clickOpen}
            />
          </div>
          <div className="direction__icon-direction">
            <FontAwesomeIcon className="icon" icon={faDirections} />
          </div>
          <div className="direction__icon-close">
            <FontAwesomeIcon
              className="icon"
              icon={faTimes}
              onClick={turnMode}
            />
          </div>
        </div>
        <div className="direction__input">
          <div className="direction__input-start">
            <FontAwesomeIcon className="icon" icon={faCircle} />
            <input
              type="text"
              autocomplete="off"
              id="input-start"
              value={
                data.start.properties.name !== null
                  ? data.start.properties.name
                  : data.start.geometry.coordinates.join(',')
              }
              placeholder="Chọn điểm bắt đầu..."
              onChange={changeStart}
              onFocus={focusHandle}
              onBlur={blurHandle}
            />
          </div>
          <div className="direction__input-end">
            <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
            <input
              type="text"
              autocomplete="off"
              value={
                data.end.properties.name !== null
                  ? data.end.properties.name
                  : data.end.geometry.coordinates.join(',')
              }
              placeholder="Chọn điểm đến..."
              onChange={changeEnd}
              onFocus={focusHandle1}
              onBlur={blurHandle1}
            />
          </div>
          <div className="direction__input-convert">
            <FontAwesomeIcon
              className="icon"
              icon={faHistory}
              onClick={clickConvert}
            />
          </div>
        </div>
      </div>
      <Most id="start" mostSearched={data.geoLoc.features} height={height} />
      <Most id="end" mostSearched={data.geoLoc.features} height={height1} />
    </div>
  );
}

export default Direction;
