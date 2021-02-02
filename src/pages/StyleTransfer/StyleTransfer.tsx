/* global pywebview */
import * as React from 'react'
const {useState} = React;
import {useTransition, animated} from "react-spring"
import "./StyleTransfer.scss"
import ResultDisplay from "../ResultDisplay/ResultDisplay"
import EditorDisplay from "../EditorDisplay/EditorDisplay"


export default function StyleTransfer() {
    const [contentImage, setContentImage] = useState("")
    const [styleImage, setStyleImage] = useState("")
    const [stylizedImage, setStylizedImage] = useState("")

    const pageTransitions = useTransition(stylizedImage, null, {
        from: {
            opacity: 0,
            transform: 'scale(0.97)'
        },
        enter: {
            opacity: 1,
            transform: 'scale(1)'
        },
        leave: {
            opacity: 0,
            transform: 'scale(0.97)'
        }
    })
    
    return pageTransitions.map(({item, props}) => {
        return item ? 
                <animated.div className="page-wrapper" key={"Result"} style={props}>
                    <ResultDisplay resultImage={stylizedImage} onResultChange={setStylizedImage} /> 
                </animated.div>
                :
                <animated.div className="page-wrapper" key={"Editor"} style={props}>
                    <EditorDisplay styleImage={styleImage}
                        contentImage={contentImage}
                        onStyleChange={setStyleImage}
                        onContentChange={setContentImage}
                        onImageGenerated={setStylizedImage}
                    />
                </animated.div>
            
        
        
        
    })
}