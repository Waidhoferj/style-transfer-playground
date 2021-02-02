import * as React from 'react'
import {useSpring, animated} from "react-spring"
import "./ImagePanel.scss"
import {Upload} from "react-feather"

type ImagePanelProps {
    onImageUpload: (base64Data: string) => void, 
    label: string, 
    image: string,
    style?: any
}

export default function ImagePanel(props: ImagePanelProps) {
    const imageShown = props.image.length > 0;
    const imageSpring = useSpring({
        opacity: imageShown ? 1 : 0,
        transform: `scale(${imageShown ? 1 : 0.95})`
    })

    function handleImageUpload(e: React.ChangeEvent<HTMLElement>) {
        const el = (e.target as HTMLInputElement);
        const file = el.files[el.files.length - 1]
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
            props.onImageUpload(fileReader.result.toString())
            el.value = null
        }
    }

    return (<div className="ImagePanel" style={props.style}>
        <label>
        <div className="upload-panel">
            <input className="file-input" type="file" onChange={handleImageUpload}/>
            <i><Upload size={30} color="var(--primary)"/></i>
            <h3 className="title">{props.label}</h3>
        </div>
        <animated.div style={imageSpring} className="image-wrapper">
            <h3 className="image-title">{props.label}</h3>
            <img className="panel-image"  src={props.image}/>
        </animated.div>
        </label>   
    </div>)
}