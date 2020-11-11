import React, { useState,useEffect } from 'react'
import "./ColorSwitch.css"
import {gsap} from 'gsap/all'

export const ColorSwitch = () =>{

    let [theme,setTheme] = useState(0)

    let t = gsap.timeline();

    let dialRef = null;

    useEffect(
        ()=>{
            
            function f(){
                if(theme==0){
                    t.to(dialRef,{left:0,transform:"translateX(0)",duration:0.3},0)
                }
                else{
                    t.to(dialRef,{left:"100%",transform:"translateX(-100%)",duration:0.3},0)
                }
            }

            f();
        }
    )   

    const setDialer = () =>{
        if(theme==0){
            setTheme(1)
        }
        else{
            setTheme(0)
        }
    }

    return(
        <div className="color-holder">
            <span className="glyph fa fa-sun-o">

            </span>
            <div className="dialer">
                <div ref={ref=>dialRef=ref} onClick={setDialer} className="dial">

                </div>
            </div>
            <span className="glyph fa fa-moon-o">

            </span>
        </div>
    )
}