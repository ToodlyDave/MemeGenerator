import React,{useEffect,useState} from 'react'
import "./Uploader.css"
import {Cropper} from "../Cropper/Cropper"
import {gsap,Bounce} from 'gsap/all'

export const Uploader = () =>{

    let [file,setFile] = useState(null)
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

    let t = gsap.timeline();

    let pageRef = null;
    let line1Ref = null;
    let line2Ref = null;
    let cropperRef = null;
    let circleRef = null;
    let lineRef = null;

    useEffect(
        ()=>{
            
            function f(){
                if(fileURL!=null){
                    t
                    .to(line1Ref,{transform:"rotate(90deg)",duration:0.2},0)
                    .to(line1Ref,{height:"0",transform:"rotate(0)",duration:0},0.2)
                    .to(lineRef,{transform:"rotate(45deg)",left:"50%",width:"40%",duration:1},0.2)
                    .to(line2Ref,{top:"100%",left:"-50%",width:"calc(100% + 0.1rem)",duration:0.5},0.2)
                    .to(line1Ref,{left:"50%",top:"10%",height:"calc(90% + 0.1rem)",duration:0.5},0.2)
                    .to(circleRef,{strokeDashoffset:"0",duration:2},0)
                    .to(cropperRef,{transform:"scale(1)",duration:.5},1.5)   
                }
            }

            f();
        }
    )   

    return(
        <div className="uploader" onDragOver={(ev)=>{ev.preventDefault()}} onDragEnter={setDropperColor} onDrop={e => {setCurrentFile(e)}} >
                <div ref={ref=>pageRef=ref} className="Page">
                    <div className="Drop-file-text">
                        Drop file here
                    </div><div className="box">
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
                    }}
                        /*onClick={(e) => {
                        e.target.style.borderColor = "red";
                        }}*/>
                    UPLOAD
                    </label>
                    <input type="file" id="uploader" onChange={setFileObject}/>
                    {/*<button className="Upload-button" >
                        UPLOAD
                    </button>*/}
                </div>
                <div ref={ref=>cropperRef=ref} className="cropper-container">
                    <Cropper file={fileURL} />
                </div>
        </div>
    )
}

