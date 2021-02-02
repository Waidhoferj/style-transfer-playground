import * as React from 'react'
import "./ResultDisplay.scss"
import MenuTray from "../../components/MenuTray/MenuTray"
import testImg from "../../assets/test.jpg"

type ResultDisplayProps {
    resultImage:string,
    onResultChange: (data: string) => void,
}

export default function ResultDisplay(props: ResultDisplayProps) {

    function handleDownload() {
        pywebview.api.save_image(props.resultImage)
    }

    return <main className="ResultDisplay">
        <img className="result-image" src={props.resultImage}/>
        <MenuTray>
            <button onClick={handleDownload}>
                Download</button>
            <button onClick={() => props.onResultChange("")}>Back</button>
        </MenuTray>  
    </main>
}