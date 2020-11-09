import React, { useEffect, useRef, useState } from 'react'
import "./Cropper.css";
import {gsap} from 'gsap/all'

export const Cropper = ({file}) =>{

    let [cropperDim,setCropperDims] = useState({
        width:0,
        height:0,
        left:0,
        top:0,
        scale:1
    })

    let [clicked,setClick] = useState(false)
    let [imageDims,setImageDims] = useState({
        width:0,
        height:0,
        left:0,
        top:0,
        scale:1,
    })

    let t = gsap.timeline()

    useEffect(() => {
        window.addEventListener('resize',setDims,false);
        return () => {window.removeEventListener('resize',setDims)
        }
    })

    //refs for the image and crop area
    let holderRef = useRef(null);
    let imageRef = useRef(null);
    let cropRef = null;

    //this is to initially scale down the image if it is larger than the screen
    //this component also sets the cropper box initially
    const setDims = () =>{
        if(imageRef.current && holderRef.current){
            let temp = holderRef.current.getBoundingClientRect()
            let scaleX =  holderRef.current.offsetWidth/imageRef.current.offsetWidth
            let scaleY =  holderRef.current.offsetHeight/imageRef.current.offsetHeight
            let scale = Math.min(scaleX,scaleY)
            setCropperDims((cropperDim)=>{
                return {
                width:cropperDim.width==0?imageRef.current.offsetWidth*scale:cropperDim.width/cropperDim.scale*scale,
                height:cropperDim.width==0?imageRef.current.offsetHeight*scale:cropperDim.height/cropperDim.scale*scale,
                left:cropperDim.width==0?0:cropperDim.left/cropperDim.scale*scale,
                top: cropperDim.height==0?0:cropperDim.top/cropperDim.scale*scale,
                scale:scale
                }
            })
            setImageDims(()=>{
                return {
                    width:imageRef.current.offsetWidth*scale,
                    height:imageRef.current.offsetHeight*scale,
                    left:0,
                    top:0,
                    holdertop:temp.top,
                    holderLeft:temp.left,
                }
            })
        }
    }

    const resize = (e) =>{
        let temp = cropRef.getBoundingClientRect()
        let temp1 = holderRef.current.getBoundingClientRect()
        var clientX = e.clientX - temp1.left; //x position within the element.
        var clientY = e.clientY - temp1.top;  //y position within the element.
        let leftDifference = 0
        let widthDifference = 0
        let topDifference = 0
        let heightDifference = 0
        switch(clicked){
            case 1:{
                if(clientX >= imageDims.left && clientX <= temp.right -temp1.left -10 && clientX <=imageDims.left + imageDims.width -10){
                    leftDifference = clientX - cropperDim.left
                    widthDifference = cropperDim.width - leftDifference
                }
                if(clientY >= imageDims.top && clientY <= temp.top + temp.height - temp1.top -10){
                    topDifference = clientY - cropperDim.top
                    heightDifference = (cropperDim.height - topDifference)<imageDims.height?cropperDim.height - topDifference:imageDims.height
                }
                setCropperDims({
                    ...cropperDim,
                    height:(heightDifference>0)?heightDifference:cropperDim.height,
                    top:cropperDim.top + topDifference > imageDims.top?cropperDim.top + topDifference:cropperDim.top,
                    left: (cropperDim.left + leftDifference)>imageDims.left?cropperDim.left + leftDifference:imageDims.left,
                    width:(widthDifference>0)?widthDifference:cropperDim.width,
                })
                return
            }
            case 2:{
                if(clientX <= imageDims.left + imageDims.width && clientX >= temp.left - temp1.left +10 && clientX >= imageDims.left + 10){
                    leftDifference = clientX - cropperDim.left - cropperDim.width
                    widthDifference = cropperDim.width + leftDifference 
                }
                if(clientY >= imageDims.top && clientY <= temp.top + temp.height - temp1.top -10){
                    topDifference = clientY - cropperDim.top
                    heightDifference = (cropperDim.height - topDifference)<imageDims.height?cropperDim.height - topDifference:imageDims.height
                }
                setCropperDims({
                    ...cropperDim,
                    height:(heightDifference>0)?heightDifference:cropperDim.height,
                    top:cropperDim.top + topDifference > imageDims.top?cropperDim.top + topDifference:cropperDim.top,
                    left: cropperDim.left,
                    width:(widthDifference>0)?widthDifference:cropperDim.width
                })
                return
            }
            case 3:{
                if(clientX >= imageDims.left && clientX <= temp.right-temp1.left - 10 && clientX <=imageDims.left + imageDims.width -10){
                    leftDifference = clientX - cropperDim.left
                    widthDifference = cropperDim.width - leftDifference
                }
                if(clientY <= imageDims.top + imageDims.height && clientY >=  temp.top - temp1.top + 10){
                    topDifference = clientY - cropperDim.top - cropperDim.height
                    heightDifference = (cropperDim.height + topDifference)<imageDims.top + imageDims.height +10?cropperDim.height + topDifference:imageDims.height + imageDims.top
                }
                setCropperDims({
                    ...cropperDim,
                    height:(heightDifference>0)?heightDifference:cropperDim.height,
                    top:cropperDim.top,
                    left: (cropperDim.left + leftDifference)>imageDims.left?cropperDim.left + leftDifference:imageDims.left,
                    width:(widthDifference>0)?widthDifference:cropperDim.width
                })
                return
            }
            case 4:{
                if(clientX <= imageDims.left + imageDims.width && clientX >= temp.left - temp1.left +10 && clientX >= imageDims.left + 10){
                    leftDifference = clientX - cropperDim.left - cropperDim.width
                    widthDifference = cropperDim.width + leftDifference 
                }
                if(clientY <= imageDims.top + imageDims.height && clientY >= temp.top - temp1.top + 10){
                    topDifference = clientY - cropperDim.top - cropperDim.height
                    heightDifference = (cropperDim.height + topDifference)<imageDims.top + imageDims.height +10?cropperDim.height + topDifference:imageDims.height + imageDims.top
                }
                setCropperDims({
                    ...cropperDim,
                    height:(heightDifference>0)?heightDifference:cropperDim.height,
                    top:cropperDim.top,
                    left: cropperDim.left,
                    width:(widthDifference>0)?widthDifference:cropperDim.width
                })
                return
            }
            default:
                return
        }
    }

    const mouseLeave = () =>{
        if(clicked!==false){
        }
        setClick(0);
    }

    return(
        <div onLoad={setDims} className="holder" onMouseMove={(e)=>{resize(e)}} onMouseLeave={mouseLeave} onMouseUp={()=>{setClick(0)}} ref={holderRef}>
            <div style={{width:cropperDim.width,height:cropperDim.height,top:cropperDim.top,left:cropperDim.left  }} ref={ref=>cropRef=ref} className="crop-rect">
                <div onMouseDown={()=>{setClick(1)}} className="ping ping-top-left"></div>
                <div onMouseDown={()=>{setClick(2)}} className="ping ping-top-right"></div>
                <div onMouseDown={()=>{setClick(3)}} className="ping ping-bottom-left"></div>
                <div onMouseDown={()=>{setClick(4)}} className="ping ping-bottom-right"></div>
            </div>
            <img alt="crop" ref={imageRef} style={{transform:`scale(${(cropperDim.scale)})`,top:0,left:0}} className="image-area" src={file}></img>
            <div style={{height: cropperDim.top - imageDims.top,top:imageDims.top,left: imageDims.left,width:imageDims.width}} className="gray gray-top"></div>
            <div style={{width:cropperDim.left - imageDims.left,top:cropperDim.top,left:imageDims.left,height:cropperDim.height}} className="gray gray-left"></div>
            <div style={{width:imageDims.left+imageDims.width - cropperDim.left - cropperDim.width,top:cropperDim.top,left:cropperDim.left+cropperDim.width,height:cropperDim.height}} className="gray gray-right"></div>
            <div style={{height:imageDims.top+imageDims.height-cropperDim.top-cropperDim.height,top:cropperDim.top+cropperDim.height,left:imageDims.left,width:imageDims.width}} className="gray gray-bottom"></div>
        </div>
    )
}