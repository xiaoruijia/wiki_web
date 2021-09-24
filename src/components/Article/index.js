import React, {useState} from 'react';
import "./index.scss"

const Article = (props) => {
    const [showChild, setShowChild] = useState(false)
    const clickHandle = () => {
        props.click && props.click()
    }
    const iconClickHandle = () => {
        setShowChild(!showChild)
        props.click && props.click()
    }
    return (
        <div className="Article">
            <div className={showChild ? "Article_Title_Click" : "Article_Title_None"} onClick={clickHandle}>
                {props.haveAnchor ?
                    <div className="icon">{showChild ?
                        <span className="iconfont" onClick={iconClickHandle}>&#xe60d;</span> :
                        <span className="iconfont" onClick={iconClickHandle}>&#xe60c;</span>}</div> : null
                }
                {props.name}
            </div>
            {showChild ? props.children : null}
        </div>
    )
}
export default Article
