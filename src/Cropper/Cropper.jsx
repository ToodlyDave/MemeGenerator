import React, { useEffect, useRef, useState } from 'react'
import "./Cropper.css";
import {gsap} from 'gsap/all'

export const Cropper = ({file}) =>{

    let [cropperDim,setCropperDims] = useState({
        width:0,
        height:0,
        left:0,
        top:0,
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

    useEffect(
        ()=>{
            
            function f(){
                console.log(cropperDim,imageDims)
            }

            f();
        }
    )   


    //refs for the image and crop area
    let imageRef = useRef(null);
    let cropRef = null;
    let holderRef = null;

    //this is to initially scale down the image if it is larger than the screen
    //this component also sets the cropper box initially
    const setDims = () =>{
        let temp = holderRef.getBoundingClientRect()
        let temp2 = imageRef.getBoundingClientRect()
        let scaleX = 1
        let scaleY = 1
        if(imageRef.offsetWidth > holderRef.offsetWidth){
            scaleX =  holderRef.offsetWidth/imageRef.offsetWidth
        }
        if(imageRef.offsetHeight > holderRef.offsetHeight){
            scaleY =  holderRef.offsetHeight/imageRef.offsetHeight
        }
        const temp1 = scaleY
        scaleY = scaleY<1?scaleY<scaleX?scaleY:scaleX:1
        scaleX = scaleX<1?scaleX<temp?scaleX:temp1:1
        let scale = Math.min(scaleX,scaleY)
        setCropperDims({
            width:imageRef.offsetWidth*scale,
            height:imageRef.offsetHeight*scale,
            left:temp2.left,
            top:temp2.top
        })
        setImageDims({
            width:imageRef.offsetWidth*scale,
            height:imageRef.offsetHeight*scale,
            left:temp2.left,
            top:temp2.top,
            holdertop:temp.top,
            holderLeft:temp.left,
            scale:scale,
        })
    }

    const resize = (e) =>{
        let temp = cropRef.getBoundingClientRect()
        let temp1 = holderRef.getBoundingClientRect()
        var clientX = e.clientX - temp1.left; //x position within the element.
        var clientY = e.clientY - temp1.top;  //y position within the element.
        let leftDifference = 0
        let widthDifference = 0
        let topDifference = 0
        let heightDifference = 0
        switch(clicked){
            case 1:{
                if(clientX >= imageDims.left && clientX <= temp.right -10 && clientX <=imageDims.left + imageDims.width -10){
                    leftDifference = clientX - cropperDim.left
                    widthDifference = cropperDim.width - leftDifference
                }
                if(clientY >= imageDims.top && clientY <= temp.top + temp.height -10){
                    topDifference = clientY - cropperDim.top
                    heightDifference = (cropperDim.height - topDifference)<imageDims.height?cropperDim.height - topDifference:imageDims.height
                }
                setCropperDims({
                    height:(heightDifference>0)?heightDifference:cropperDim.height,
                    top:cropperDim.top + topDifference > imageDims.top?cropperDim.top + topDifference:cropperDim.top,
                    left: (cropperDim.left + leftDifference)>imageDims.left?cropperDim.left + leftDifference:imageDims.left,
                    width:(widthDifference>0)?widthDifference:cropperDim.width
                })
                storeImageData()
                return
            }
            case 2:{
                if(clientX <= imageDims.left + imageDims.width && clientX >= temp.left +10 && clientX >= imageDims.left + 10){
                    leftDifference = clientX - cropperDim.left - cropperDim.width
                    widthDifference = cropperDim.width + leftDifference 
                }
                if(clientY >= imageDims.top && clientY <= temp.top + temp.height -10){
                    topDifference = clientY - cropperDim.top
                    heightDifference = (cropperDim.height - topDifference)<imageDims.height?cropperDim.height - topDifference:imageDims.height
                }
                setCropperDims({
                    height:(heightDifference>0)?heightDifference:cropperDim.height,
                    top:cropperDim.top + topDifference > imageDims.top?cropperDim.top + topDifference:cropperDim.top,
                    left: cropperDim.left,
                    width:(widthDifference>0)?widthDifference:cropperDim.width
                })
                storeImageData()
                return
            }
            case 3:{
                if(clientX >= imageDims.left && clientX <= temp.right -10 && clientX <=imageDims.left + imageDims.width -10){
                    leftDifference = clientX - cropperDim.left
                    widthDifference = cropperDim.width - leftDifference
                }
                if(clientY <= imageDims.top + imageDims.height && clientY >= temp.top + 10){
                    topDifference = clientY - cropperDim.top - cropperDim.height
                    heightDifference = (cropperDim.height + topDifference)<imageDims.top + imageDims.height +10?cropperDim.height + topDifference:imageDims.height + imageDims.top
                }
                setCropperDims({
                    height:(heightDifference>0)?heightDifference:cropperDim.height,
                    top:cropperDim.top,
                    left: (cropperDim.left + leftDifference)>imageDims.left?cropperDim.left + leftDifference:imageDims.left,
                    width:(widthDifference>0)?widthDifference:cropperDim.width
                })
                storeImageData()
                return
            }
            case 4:{
                if(clientX <= imageDims.left + imageDims.width && clientX >= temp.left +10 && clientX >= imageDims.left + 10){
                    leftDifference = clientX - cropperDim.left - cropperDim.width
                    widthDifference = cropperDim.width + leftDifference 
                }
                if(clientY <= imageDims.top + imageDims.height && clientY >= temp.top + 10){
                    topDifference = clientY - cropperDim.top - cropperDim.height
                    heightDifference = (cropperDim.height + topDifference)<imageDims.top + imageDims.height +10?cropperDim.height + topDifference:imageDims.height + imageDims.top
                }
                setCropperDims({
                    height:(heightDifference>0)?heightDifference:cropperDim.height,
                    top:cropperDim.top,
                    left: cropperDim.left,
                    width:(widthDifference>0)?widthDifference:cropperDim.width
                })
                storeImageData()
                return
            }
            default:
                return
        }
    }

    const storeImageData = () =>{
        //we upload the image in this function
    }

    const mouseLeave = () =>{
        if(clicked!==false){
            storeImageData();
        }
        setClick(0);
    }

    return(
        <div ref={ref=>holderRef=ref} onLoad={setDims} className="holder" onMouseMove={(e)=>{resize(e)}} onMouseLeave={mouseLeave} onMouseUp={()=>{setClick(0)}}>
            <div style={{width:cropperDim.width,height:cropperDim.height,top:cropperDim.top,left: cropperDim.left }} ref={ref=>cropRef=ref} className="crop-rect">
                
                {/*These 4 are for the circular clickers on the corners of the image*/}
                <div onMouseDown={()=>{setClick(1)}} className="ping ping-top-left"></div>
                <div onMouseDown={()=>{setClick(2)}} className="ping ping-top-right"></div>
                <div onMouseDown={()=>{setClick(3)}} className="ping ping-bottom-left"></div>
                <div onMouseDown={()=>{setClick(4)}} className="ping ping-bottom-right"></div>
            </div>
            <img alt="crop" ref={ref=>imageRef=ref} style={{transform:`scale(${(imageDims.scale)})`,top:imageDims.top,left:imageDims.left}} className="image-area" src={file}></img>
            {/*These 4 are for the gray,unselected parts of the image*/}
            <div style={{height: cropperDim.top - imageDims.top,top:imageDims.top,left: imageDims.left,width:imageDims.width}} className="gray gray-top"></div>
            <div style={{width:cropperDim.left - imageDims.left,top:cropperDim.top,left:imageDims.left,height:cropperDim.height}} className="gray gray-left"></div>
            <div style={{width:imageDims.left+imageDims.width - cropperDim.left - cropperDim.width,top:cropperDim.top,left:cropperDim.left+cropperDim.width,height:cropperDim.height}} className="gray gray-right"></div>
            <div style={{height:imageDims.top+imageDims.height-cropperDim.top-cropperDim.height,top:cropperDim.top+cropperDim.height,left:imageDims.left,width:imageDims.width}} className="gray gray-bottom"></div>

        </div>
    )
}