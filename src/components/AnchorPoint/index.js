import React from 'react';
import "./index.scss"

const AnchorPoint = (props) => {
    const clickHandle = () => {
        props.click && props.click()
    }
    return (
        <div className="AnchorPoint">
            <div className="AnchorPoint_Title" onClick={clickHandle}>{props.name}</div>
        </div>
    )
}
export default AnchorPoint
