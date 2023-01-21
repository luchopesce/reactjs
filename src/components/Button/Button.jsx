import "./button.css"
import React from "react";

export default function Button(props){
    let [colorState, setColorState] = React.useState("btn btn-primary mx-2");

    let styleButton = colorState

    return <button onClick={props.onClick} className={styleButton}>
            {props.children}
            </button>;

}