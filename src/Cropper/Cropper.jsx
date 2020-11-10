import React, { useEffect, useRef, useState } from 'react'
import "./Cropper.css";

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
        height:0
    })

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
            let scale = Math.min(holderRef.current.offsetWidth/imageRef.current.offsetWidth, holderRef.current.offsetHeight/imageRef.current.offsetHeight)
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
                    height:imageRef.current.offsetHeight*scale
                }
            })
        }
    }

    const leftPingX = (clientX,temp,temp1) =>{
        if(clientX >= 0 && clientX <= temp.right -temp1.left -10 && clientX <=0 + imageDims.width -10){
            let leftDifference = clientX - cropperDim.left
            let widthDifference = cropperDim.width - leftDifference
            return {leftDifference:leftDifference,widthDifference:widthDifference}
        }
        return {leftDifference:0,widthDifference:0}
    }

    const rightPingX = (clientX,temp,temp1) =>{
        if(clientX <= 0 + imageDims.width && clientX >= temp.left - temp1.left +10 && clientX >= 0 + 10){
            let leftDifference = clientX - cropperDim.left - cropperDim.width
            let widthDifference = cropperDim.width + leftDifference
            return {widthDifference:widthDifference}
        }
        return {widthDifference:0}
    }

    const topPingY = (clientY,temp,temp1) =>{
        if(clientY >= 0 && clientY <= temp.top + temp.height - temp1.top -10){
            let topDifference = clientY - cropperDim.top
            let heightDifference = (cropperDim.height - topDifference)<imageDims.height?cropperDim.height - topDifference:imageDims.height
            return {topDifference:topDifference,heightDifference:heightDifference}
        }
        return {topDifference:0,heightDifference:0}
    }

    const bottomPingY = (clientY,temp,temp1) =>{
        if(clientY <= 0 + imageDims.height && clientY >=  temp.top - temp1.top + 10){
            let topDifference = clientY - cropperDim.top - cropperDim.height
            let heightDifference = (cropperDim.height + topDifference)<0 + imageDims.height +10?cropperDim.height + topDifference:imageDims.height + 0
            return {topDifference:topDifference,heightDifference:heightDifference}
        }
        return {topDifference:0,heightDifference:0}
    }

    const returnMousePosition = (event,holderRef) =>{
        return {clientX:event.clientX - holderRef.left,clientY:event.clientY - holderRef.top}
    }

    const resize = (e) =>{
        let [temp,temp1] = [cropRef.getBoundingClientRect(),holderRef.current.getBoundingClientRect()]
        let {clientX,clientY} = returnMousePosition(e,temp1)
        switch(clicked){
            case 1:{
                let {leftDifference,widthDifference} = leftPingX(clientX,temp,temp1)
                let {topDifference,heightDifference} = topPingY(clientY,temp,temp1)
                setCropperDims({
                    ...cropperDim,
                    height:(heightDifference>0)?heightDifference:cropperDim.height,
                    top:cropperDim.top + topDifference > 0?cropperDim.top + topDifference:cropperDim.top,
                    left: (cropperDim.left + leftDifference)>0?cropperDim.left + leftDifference:0,
                    width:(widthDifference>0)?widthDifference:cropperDim.width,
                })
                return
            }
            case 2:{
                let {widthDifference} = rightPingX(clientX,temp,temp1)
                let {topDifference,heightDifference} = topPingY(clientY,temp,temp1)
                setCropperDims({
                    ...cropperDim,
                    height:(heightDifference>0)?heightDifference:cropperDim.height,
                    top:cropperDim.top + topDifference > 0?cropperDim.top + topDifference:cropperDim.top,
                    left: cropperDim.left,
                    width:(widthDifference>0)?widthDifference:cropperDim.width
                })
                return
            }
            case 3:{
                let {leftDifference,widthDifference} = leftPingX(clientX,temp,temp1)
                let {heightDifference} = bottomPingY(clientY,temp,temp1)
                setCropperDims({
                    ...cropperDim,
                    height:(heightDifference>0)?heightDifference:cropperDim.height,
                    top:cropperDim.top,
                    left: (cropperDim.left + leftDifference)>0?cropperDim.left + leftDifference:0,
                    width:(widthDifference>0)?widthDifference:cropperDim.width
                })
                return
            }
            case 4:{
                let {widthDifference} = rightPingX(clientX,temp,temp1)
                let {heightDifference} = bottomPingY(clientY,temp,temp1)
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
    return(
        <div onLoad={setDims} className="holder" onMouseMove={(e)=>{resize(e)}} onMouseLeave={()=>{setClick(0);}} onMouseUp={()=>{setClick(0)}} ref={holderRef}>
            <div style={{width:cropperDim.width,height:cropperDim.height,top:cropperDim.top,left:cropperDim.left  }} ref={ref=>cropRef=ref} className="crop-rect">
                <div onMouseDown={()=>{setClick(1)}} className="ping ping-top-left"></div>
                <div onMouseDown={()=>{setClick(2)}} className="ping ping-top-right"></div>
                <div onMouseDown={()=>{setClick(3)}} className="ping ping-bottom-left"></div>
                <div onMouseDown={()=>{setClick(4)}} className="ping ping-bottom-right"></div>
            </div>
            <img alt="crop" ref={imageRef} style={{transform:`scale(${(cropperDim.scale)})`,top:0,left:0}} className="image-area" src={file}></img>
            <div style={{height: cropperDim.top,top:0,left: 0,width:imageDims.width}} className="gray gray-top"></div>
            <div style={{width:cropperDim.left,top:cropperDim.top,left:0,height:cropperDim.height}} className="gray gray-left"></div>
            <div style={{width:imageDims.width - cropperDim.left - cropperDim.width,top:cropperDim.top,left:cropperDim.left+cropperDim.width,height:cropperDim.height}} className="gray gray-right"></div>
            <div style={{height:imageDims.height-cropperDim.top-cropperDim.height,top:cropperDim.top+cropperDim.height,left:0,width:imageDims.width}} className="gray gray-bottom"></div>
        </div>
    )
}