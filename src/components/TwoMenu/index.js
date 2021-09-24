import React, {useState} from 'react';
import "./index.scss"

const TwoMenu = (props) => {
    const [showChild, setShowChild] = useState(false)
    const clickHandle = () => {
        setShowChild(!showChild)
        props.click && props.click()
    }
    return (
        <div className="TwoMenu">
            <div className="TwoMenu_Title" onClick={clickHandle}>
                <div className="icon">{showChild ? <span className="iconfont">&#xe60d;</span> :
                    <span className="iconfont">&#xe60c;</span>}</div>
                {props.name}
            </div>
            {showChild ? props.children : null}
        </div>
    )
}
export default TwoMenu
