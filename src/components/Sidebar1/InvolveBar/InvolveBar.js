import React,{useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyContext from '../../../context/MyContext';
import { faShoppingCart,faBed,faUtensils,faCopy } from '@fortawesome/free-solid-svg-icons';
function InvolveBar() {
    const data = useContext(MyContext);
    const clickHandle = (val) => {
        switch(val) {
            case 'store':
                data.setStart(data.geoLoc.features.filter(a => a.properties.id=== 6)[0]);
                break;
            case 'eat':
                data.setStart(data.geoLoc.features.filter(a => a.properties.id=== 2)[0]);
                break;
            case 'sleep':
                data.setStart(data.geoLoc.features.filter(a => a.properties.id=== 5)[0]);
                break;
            case 'photocopy':
                data.setStart(data.geoLoc.features.filter(a => a.properties.id=== 4)[0]);
                break;
            default:

        }
    }
    return (
        <div className="involve">
            <h2 className="heading-secondary">Tìm kiếm khu vực này</h2>
            <div className="involve__menu"> 
                <div className="involve__menu__item1" onClick={()=>clickHandle('store')}>
                    <div className="involve__menu__item1__icon-shopping">
                        <FontAwesomeIcon className="icon" icon={faShoppingCart}  />
                    </div>
                    <p className="heading-tertiary">Cửa hàng tạp hóa</p>
                </div>
                <div className="involve__menu__item2" onClick={() => clickHandle('photocopy')}>
                    <div className="involve__menu__item2__icon-motorcycle">
                        <FontAwesomeIcon className="icon" icon={faCopy}  />
                    </div>
                    <p className="heading-tertiary">Photo & Copy</p>
                </div>
                <div className="involve__menu__item3">
                    <div className="involve__menu__item3__icon-utensils">
                        <FontAwesomeIcon className="icon" icon={faUtensils} onClick={() => clickHandle('eat')}  />
                    </div>
                    <p className="heading-tertiary">Địa điểm ăn uống</p>
                </div>
                <div className="involve__menu__item4" onClick={() => clickHandle('sleep')}>
                    <div className="involve__menu__item4__icon-hotel">
                        <FontAwesomeIcon className="icon" icon={faBed}  />
                    </div>
                    <p className="heading-tertiary">Nghỉ trưa</p>
                </div>
            </div>
        </div>
    )
}

export default InvolveBar
