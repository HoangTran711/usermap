import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import MyContext from '../../../context/MyContext';
function stringToASCII(str) {
  try {
    return str
      .replace(/[àáảãạâầấẩẫậăằắẳẵặ]/g, 'a')
      .replace(/[èéẻẽẹêềếểễệ]/g, 'e')
      .replace(/[đ]/g, 'd')
      .replace(/[ìíỉĩị]/g, 'i')
      .replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, 'o')
      .replace(/[ùúủũụưừứửữự]/g, 'u')
      .replace(/[ỳýỷỹỵ]/g, 'y');
  } catch {
    return '';
  }
}
function Most({ mostSearched, height, id }) {
  const data = useContext(MyContext);
  const [most, setMost] = useState(mostSearched);
  const [height1, setHeight1] = useState(height);
  useEffect(() => {
    setMost(mostSearched);
  }, [mostSearched]);
  useEffect(() => {
    let dem = 0;
    let isFindRoom = false;
    let items = [];
    let text = data[id === 'start' ? 'start' : 'end'].properties.name;
    if (text) {
      for (
        let i = 0;
        i < mostSearched.length &&
        dem <= 15 &&
        mostSearched[i].properties.description &&
        !isFindRoom;
        i++
      ) {
        let nameArray = mostSearched[i].properties.description.split('|');
        for (let j = 0; j < nameArray.length && dem <= 15; j++) {
          if (
            stringToASCII(nameArray[j].toLowerCase()).indexOf(
              stringToASCII(text.toLowerCase())
            ) != -1
          ) {
            dem++;
            let t = JSON.stringify(mostSearched[i]);
            t = JSON.parse(t);
            t.properties.name = nameArray[j];
            items.push(t);
          }
        }
        //get floor field in properties
        let floorArray = mostSearched[i].properties.floors;
        //formal room
        if (floorArray && floorArray.length > 0) {
          for (let fl = 0; fl < floorArray.length; fl++) {
            if (
              ((floorArray[fl].formalRooms
                ?.toLowerCase()
                .indexOf(text.toLowerCase()) != -1 ||
                floorArray[fl].formalRooms
                  ?.toLowerCase()
                  .split('.')
                  .join('-')
                  .indexOf(text.toLowerCase()) != -1) &&
                (text.indexOf('.') != -1 || text.indexOf('-') != -1)) ||
              text
                .toLowerCase()
                .indexOf(floorArray[fl].formalRooms?.toLowerCase()) != -1 ||
              text
                .toLowerCase()
                .indexOf(
                  floorArray[fl].formalRooms?.toLowerCase().split('.').join('-')
                ) != -1
            ) {
              if (
                text.length - floorArray[fl].formalRooms?.length < 2 ||
                text.length - floorArray[fl].formalRooms?.length > 2
              ) {
                items = [
                  "Tìm phòng học? Nhập như trong thời khóa biểu (Lưu ý: thêm dấu chấm ('.') vào chính giữa TÊN KHU và MÃ PHÒNG. Ví dụ: A.103, A5.304",
                ];
                isFindRoom = true;
                break;
              } else if (
                text.length - floorArray[fl].formalRooms?.length == 2 &&
                Number(text.substring(text.length - 3))
              ) {
                let t = JSON.stringify(mostSearched[i]);
                t = JSON.parse(t);
                t.properties.name = text.toUpperCase();
                items = [t];
                isFindRoom = true;
                break;
              }
            }

            //special Rooms
            else {
              for (let sr = 0; sr < floorArray[fl].specialRooms.length; sr++) {
                if (
                  stringToASCII(
                    floorArray[fl].specialRooms[sr].name.toLowerCase()
                  ).indexOf(stringToASCII(text.toLowerCase())) != -1
                ) {
                  dem++;
                  let t = JSON.stringify(mostSearched[i]);
                  t = JSON.parse(t);
                  t.properties.name = floorArray[fl].specialRooms[sr].name;
                  t.geometry.coordinates =
                    floorArray[fl].specialRooms[sr].coordinates;
                  items.push(t);
                }
              }
            }
          }
        }
      }
      setMost(items);
    }
  }, [data.start.properties.name, data.end.properties.name]);

  useEffect(() => {
    setHeight1(height);
  }, [height]);
  useEffect(() => {
    if (data.userLocation.geometry.coordinates.length === 2) {
      let temp = [];
      temp.push({
        type: 'Feature',
        properties: {
          id: 0,
          name: 'Vị trí của tôi',
        },
        geometry: {
          coordinates: data.userLocation.geometry.coordinates,
        },
      });
      for (let i = 0; i < mostSearched.length; i++) {
        temp.push(mostSearched[i]);
      }
      setMost(temp);
      let t = mostSearched.find((a) => a.properties.id === 0);
      if (!t) {
        mostSearched.push({
          type: 'Feature',
          properties: {
            id: 0,
            name: 'Vị trí của tôi',
          },
          geometry: {
            coordinates: data.userLocation.geometry.coordinates,
          },
        });
      }
    }
  }, []);
  return (
    <div
      style={{
        height: height1,
      }}
      className="most"
    >
      <ul className="most__list" id="most">
        {most.map((a, index) => {
          if (index <= 3) {
            return (
              <div
                key={index}
                onClick={() => {
                  fetch('./admin/updateQuantity', {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                      arr: [
                        {
                          id: a.properties.id,
                          qty_search: 1,
                        },
                      ],
                    }),
                  })
                    .then((res) => res.json())
                    .then((result) => {})
                    .catch((err) => console.log(err));
                  if (id === 'start') {
                    data.setStart(a);
                    if (data.prevIdStart.length === 0) {
                      if (document.getElementById(a.properties.id)) {
                        document.getElementById(
                          a.properties.id
                        ).style.animation = 'click .5s infinite';
                        document.getElementById(a.properties.id).style.color =
                          'red';
                        let temp = data.prevIdStart;
                        temp.push(a.properties.id);
                        data.setPrevIdStart(temp);
                        console.log(a.properties.id);
                      }
                    } else {
                      if (
                        document.getElementById(
                          data.prevIdStart[data.prevIdStart.length - 1]
                        )
                      ) {
                        document.getElementById(
                          data.prevIdStart[data.prevIdStart.length - 1]
                        ).style.animation = 'none';
                        document.getElementById(
                          data.prevIdStart[data.prevIdStart.length - 1]
                        ).style.color = 'inherit';
                      }
                      if (document.getElementById(a.properties.id)) {
                        document.getElementById(
                          a.properties.id
                        ).style.animation = 'click .5s infinite';
                        document.getElementById(a.properties.id).style.color =
                          'red';
                        let temp = data.prevIdStart;
                        temp.push(a.properties.id);
                        data.setPrevIdStart(temp);
                      }
                    }
                    data.direction.actions.setOriginFromCoordinates(
                      a.geometry.coordinates
                    );
                  } else {
                    data.setEnd(a);
                    if (data.prevIdEnd.length === 0) {
                      if (document.getElementById(a.properties.id)) {
                        document.getElementById(
                          a.properties.id
                        ).style.animation = 'click .5s infinite';
                        document.getElementById(a.properties.id).style.color =
                          'red';
                        let temp = data.prevIdEnd;
                        temp.push(a.properties.id);
                        data.setPrevIdEnd(temp);
                      }
                    } else {
                      if (
                        document.getElementById(
                          data.prevIdEnd[data.prevIdEnd.length - 1]
                        )
                      ) {
                        document.getElementById(
                          data.prevIdEnd[data.prevIdEnd.length - 1]
                        ).style.animation = 'none';
                        document.getElementById(
                          data.prevIdEnd[data.prevIdEnd.length - 1]
                        ).style.color = 'inherit';
                      }
                      if (document.getElementById(a.properties.id)) {
                        document.getElementById(
                          a.properties.id
                        ).style.animation = 'click .5s infinite';
                        document.getElementById(a.properties.id).style.color =
                          'red';
                        let temp = data.prevIdEnd;
                        temp.push(a.properties.id);
                        data.setPrevIdEnd(temp);
                      }
                    }
                    data.direction.actions.setDestinationFromCoordinates(
                      a.geometry.coordinates
                    );
                  }
                }}
                className="most__list__container-item"
              >
                <div className="most__list__icon">
                  <FontAwesomeIcon className="icon" icon={faClock} />
                </div>
                <li className="most__list__item">
                  {typeof a === 'string' ? a : a.properties.name}
                </li>
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default Most;
