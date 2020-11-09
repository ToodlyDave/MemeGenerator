import React, { useEffect, useState } from 'react'
import "./Templates.css"

export const Template = () => {

    const [tempList, setTempList] = useState([])

    const theTemplates = () => {
        var copyTemplates = [];
        console.log("yolo");
        for (var i = 0; i < 5; i++) {
            let c_name = "temp " + i;
            copyTemplates.push(<div className={c_name}> yolo</div>);
            console.log("hi");
        }

        return(
            <div className="template-list-container">
                {copyTemplates}
            </div>
        )
    }
    

    return (
        <div className="template">
            Pick a template
            <div className="template-container">
                {theTemplates()}           
            </div>
        </div>
    );
}