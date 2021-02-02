/* global pywebview */
import * as React from 'react'
import {useSpring} from "react-spring"
import "./EditorDisplay.scss"
import ImagePanel from "../../components/ImagePanel/ImagePanel"
import MenuTray from "../../components/MenuTray/MenuTray"
import Loader from "../../components/Loader/Loader"
import {Repeat, X as XIcon} from "react-feather"

type EditorDisplayProps {
    styleImage: string,
    contentImage: string,
    onStyleChange: (data:string) => void,
    onContentChange: (data:string) => void,
    onImageGenerated: (data:string) => void,
}


export default function EditorDisplay(props:EditorDisplayProps) {
    const {contentImage, styleImage, onContentChange, onStyleChange} = props
    
    const showMenu:boolean = !!(contentImage || styleImage)
    const disableMix:boolean = !(contentImage && styleImage)
    const [loading, setLoading] = React.useState(false)
    const menuProps = useSpring({transform: `translateY(${showMenu ? 0 : 100}px)`})


    function handleClear() {
        onContentChange("")
        onStyleChange("")
    }

    function handleSwap() {
        const tmp = contentImage
        onContentChange(styleImage)
        onStyleChange(tmp)
    }

    async function handleMix() {
        // Call the python api
        try {
            setLoading(true)
            const stylizedImageUri = await window.pywebview.api.apply_style({source: contentImage, style: styleImage})
            props.onImageGenerated(stylizedImageUri)
        } catch(err) {
            setLoading(false)
            console.error(err)
        } 
    }


    

    return <main className="EditorDisplay">
        <div className="source-images">
            <ImagePanel style={{gridArea: "left-panel"}} image={contentImage} label="Source" onImageUpload={onContentChange} />
            <ImagePanel style={{gridArea: "right-panel"}} image={styleImage} label="Style" onImageUpload={onStyleChange}/>
        </div>
        <MenuTray style={menuProps}>
            {loading ? <Loader/>  : (<>
            <i><Repeat onClick={handleSwap}/></i>
            <button onClick={handleMix} disabled={disableMix}>Mix</button>
            <i><XIcon onClick={handleClear}/></i>
            </>)}
        </MenuTray>
    </main>
}