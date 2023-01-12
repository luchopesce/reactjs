import "./button.css"
import React from "react";

export default function Button(props){
    let [colorState, setColorState] = React.useState("btn btn-primary");

    let styleButton = colorState

    function handleClick(evt){
        console.log("Evento click")
        setColorState("btn btn-black")
    }

    return <button onClick={handleClick} className={styleButton}>{props.children}</button>;

}