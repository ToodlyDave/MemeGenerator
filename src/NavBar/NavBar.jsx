import React from 'react'
import "./NavBar.css"
import {ColorSwitch} from "../ColorSwitch/ColorSwitch"

export const NavBar = (props) =>{

    return(
        <div className="nav-bar">
            <span>DeepFake</span>
            <ColorSwitch></ColorSwitch>
        </div> 
    )
}
