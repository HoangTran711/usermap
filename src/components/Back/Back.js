import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import MyContext from '../../context/MyContext';

function Back() {
  const data = useContext(MyContext);
  const clickHandle = () => {
    data.direction.actions.setOriginFromCoordinates([106.77, 10.851]);
  };
  return (
    <div onClick={clickHandle} className="back">
      <FontAwesomeIcon icon={faCompass} />
    </div>
  );
}

export default Back;
