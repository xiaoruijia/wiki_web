import React, {useState} from 'react';
import "./index.scss"

const ThreeMenu = (props) => {
    const [showChild, setShowChild] = useState(false)
    const clickHandle = () => {
        setShowChild(!showChild)
        props.click && props.click()
    }
    return (
        <div className="ThreeMenu">
            <div className="ThreeMenu_Title" onClick={clickHandle}>{props.name}</div>
            {showChild ? props.children : null}
        </div>
    )
}
export default ThreeMenu
