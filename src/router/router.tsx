import {HashRouter, Route} from 'react-router-dom'
import React from "react"
// import Home from "../view/Home"
import Index from "../view/Index"

const router = () => {
    return (
        <HashRouter>
            {/*<Route path="/" exact component={Home}/>*/}
            <Route path="/" exact component={Index}/>
        </HashRouter>
    )
}
export default router
