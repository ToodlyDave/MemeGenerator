import React,{useEffect,useState} from 'react'
import "./Uploader.css"
import {Cropper} from "../Cropper/Cropper"
import {gsap} from 'gsap/all'

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

    useEffect(
        ()=>{
            
            function f(){
                if(fileURL!=null){
                    t
                    .to(line1Ref,{transform:"rotate(-45deg)  translateY(30px) translateX(15px)", transformOrigin:"bottom left",duration:0.5},0)
                    .to(line2Ref,{transform:"rotate(+50deg) translateX(-1px) translateY(43px)", width:"25%",transformOrigin:"bottom left",duration:0.5},0)
                    /*.to(pageRef,{filter:"blur(10px)",transitionDuration:.5, scale: 1.1},0.5)*/
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
                    </div>
                    <div className="Circle">
                        <div ref={ref=>line1Ref=ref} className="line"></div>
                        <div ref={ref=>line2Ref=ref} className="line line2"></div>
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

