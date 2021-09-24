import React, {useState} from 'react';
import "./index.scss"
import TwoMenu from '../TwoMenu'
import ThreeMenu from '../ThreeMenu'
import Article from '../Article'
import AnchorPoint from "@/components/AnchorPoint";

const Menu = (props) => {
    const [showChild, setShowChild] = useState(false)
    const clickHandle = () => {
        setShowChild(!showChild)
        props.click && props.click()
    }
    return (
        <div className="menu">
            <div className={showChild ? "menu_Title_White" : "menu_Title_Dark"} onClick={clickHandle}>
                <div className="icon">{showChild ? <span className="iconfont">&#xe60d;</span> :
                    <span className="iconfont">&#xe60c;</span>}</div>
                {props.name}
            </div>
            {showChild ? props.children : null}
        </div>
    )
}
Menu.TwoMenu = TwoMenu
Menu.ThreeMenu = ThreeMenu
Menu.Article = Article
Menu.AnchorPoint = AnchorPoint
export default Menu
