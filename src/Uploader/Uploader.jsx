import React,{useEffect,useState} from 'react'
import "./Uploader.css"
import {Cropper} from "../Cropper/Cropper"
import {gsap} from 'gsap/all'

export const Uploader = () =>{

    const [fileURL, setFileURL] = useState(null)

    const setFileObject = (event) => {
        if(!fileURL){
            const fileUploaded = event.target.files[0];
            setFileURL(URL.createObjectURL(fileUploaded))

        }
    }
    
    const setCurrentFile = (event) => {
        if(!fileURL){
            //let event = e as Event;
            event.preventDefault();
            event.stopPropagation();
            event.persist();
            let dt = event.dataTransfer
            let files = dt.files[0]
            setFileURL(URL.createObjectURL(files))
        }
    }

    const setDropperColor = (e) =>{
        e.preventDefault()
        e.stopPropagation()
    }

    const closeContentArea = () =>{
        t.reverse()
    }

    const resetFiles = () =>{
        setFileURL(null)
    }

    let t = gsap.timeline({onReverseComplete:resetFiles});

    let line1Ref = null;
    let line2Ref = null;
    let cropperRef = null;
    let circleRef = null;
    let lineRef = null;
    let boxRef = null;
    let bgRef = null;
    let contentRef = null;

    useEffect(
        ()=>{
            
            function f(){
                if(fileURL!=null){
                    t
                    .to(line1Ref,{transform:"rotate(90deg)",duration:0.2},0)
                    .to(line1Ref,{height:"0",transform:"rotate(0)",duration:0},0.2)
                    .to(lineRef,{transform:"rotate(45deg)",left:"50%",width:"40%",duration:1},0.2)
                    .to(line2Ref,{top:"100%",transform:"translateY(calc(-50% - 0.05rem))",left:"-50%",width:"calc(100% + 0.05rem)",duration:0.5},0.2)
                    .to(line1Ref,{left:"50%",top:"10%",height:"calc(90% + 0.2rem)",transform:"translateY(calc(90% - 0.05rem))",duration:0.5},0.2)
                    .to(circleRef,{strokeDashoffset:"0",duration:2},0)
                    .to(boxRef,{transform:"scale(0)",duration:0.2},1.5)
                    .to(bgRef,{transform:"scale(1) translate(-50%,-50%)",duration:0.5},1.7)
                    .to(contentRef,{opacity:1,duration:0.2},2.2)
                    .to(cropperRef,{pointerEvents:"all",duration:0},2.2)
                }
            }

            f();
        }
    )   

    return(
        <div className="uploader" onDragOver={(ev)=>{ev.preventDefault()}} onDragEnter={setDropperColor} onDrop={e => {setCurrentFile(e)}} >
                <div className="Page">
                    <div className="Drop-file-text">
                        Drop file here
                    </div>
                    <div ref={ref=>boxRef=ref} className="box">
                        <svg>
                        <circle ref={ref=>circleRef=ref} cx="50%" cy="50%" style={{strokeWidth:"3"}} r="48%" />
                        </svg>
                        <div className="line-holder">
                        <div ref={ref=>lineRef=ref} className="line">
                            <div ref={ref=>line1Ref=ref} className="line1">

                            </div>
                            <div ref={ref=>line2Ref=ref} className="line2">
                            
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="Or-text">
                    or
                    </div>
                    <label for="uploader" className="Upload-button" 
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#ACEAF2";
                        e.target.style.borderColor = "#207BCE";
                        e.target.style.color = "#207BCE";
                        e.target.style.borderWidth = "3px"
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = "#042441";
                        e.target.style.borderColor = "#81A6C7";
                        e.target.style.color = "white";
                        e.target.style.borderWidth = "2px"
                    }}>
                    Upload
                    </label>
                    <input type="file" id="uploader" onChange={setFileObject}/>
                    <div ref={ref=>cropperRef=ref} className="cropper-container">
                        <div ref={ref=>contentRef=ref} className="content-area">
                            <div className="exit-bar" onClick={closeContentArea}>
                                <div className="exit-button">
                                    &times;
                                </div>
                            </div>
                            {
                                fileURL!==null?
                                <Cropper file={fileURL} />:
                                ""
                            }
                        </div>
                        <div ref={ref=>bgRef=ref} className="white-background">
                        </div>
                    </div>
                </div>
        </div>
    )
}

