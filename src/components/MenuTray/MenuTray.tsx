import * as React from "react"
const {useState} = React
import "./MenuTray.scss"
import {animated} from "react-spring"
import {Repeat, X as XIcon} from "react-feather"


type MenuTrayProps {
    imagesChosen?: boolean,
    style?: any,
    children?: React.ReactNode
}

export default function MenuTray(props:MenuTrayProps) {
    return <div className="MenuTray">
        <animated.aside className="menu-tray" style={props.style}>
            {props.children}
        </animated.aside>
        
    </div>
}