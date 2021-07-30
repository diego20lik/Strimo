import React, { useState, useRef, useEffect } from "react";
import Pausa from "../images/pausa png.png";
import Play from "../images/play png.png";
import Slider from "@material-ui/core/Slider";
import screenfull from "screenfull"
import ReactPlayer from "react-player";
import speaker from "../images/speaker.png"
import fullscreen from "../images/fullscreen.png"
const cancelTimer = (handle)=>{
  if (handle) {
    clearTimeout(handle);
  }
}
function Video({url, titulo, mute, playV}) {
    const [play, setPlay] = useState(playV);
    const [info, setInfo] = useState();
    const [muted, setMuted] = useState(mute);
    const [value, setValue] = useState({played: 0});
    const [seek, setSeek] = useState(false);
    const [played, setPlayed] = useState(0);
    const [link, setLink] = useState("https://firebasestorage.googleapis.com/v0/b/strimo-9e1a1.appspot.com/o/video-test%2FVID-20210419-WA0012.mp4?alt=media&token=c1988061-1873-4491-8c91-51b617fa6f80");
    const [valueVolume, setValueVolume] = useState(50);
    const [show, setShow] = useState(false);
    const videoRef = useRef(null)
    const {current: timer} = useRef({})
    const playerRef = useRef(null)
    const controlsRef = useRef(null)
    const handleChangePlayer = (event, newValue) => {
      setPlayed(parseFloat(newValue/100))
    };
    useEffect(()=>{
      console.log(play);
    }, [play])
    const mouseDown = () => {
      setSeek(true)
    }

    const mouseUp = (e, newValue) => {
      setSeek(false)
      playerRef.current.seekTo(newValue/100)
    }

    const handleChangeVolumen =(event, newValue) => {
      if(muted&&newValue>0)setMuted(false)    
      setValueVolume(newValue);
    };

    const toggleFullScreen = ()=>{
      screenfull.toggle(videoRef.current)
    }

    const handleProgress = (changeState)=>{
      if( !seek ){
        setValue({...changeState})
        setPlayed(changeState.played)
      }
    }

    const hoverControls = (e)=>{
      controlsRef.current.style.opacity = 1
      controlsRef.current.style.cursor = "auto" 
      timer.timer = cancelTimer(timer.timer)
      timer.timer = setTimeout(()=>{
        if(controlsRef.current==null)return
        controlsRef.current.style.opacity = 0 
        controlsRef.current.style.cursor = "none" 
      }, 2500)
    }
    const hoverLeave = (e)=>{
      if(controlsRef.current===null)return
      controlsRef.current.style.opacity = 0
    }
    return (
      <>
        <div className="video" ref={videoRef} onMouseMove={hoverControls} onMouseOut={hoverLeave}>
            <ReactPlayer
              className="player"
              url={url}
              muted={muted}
              playing={play}
              controls={false}
              progressInterval={500}
              volume={parseFloat(valueVolume/100)}
              onProgress={handleProgress}
              ref={playerRef}
            />
            <div className="controles" onClick={()=>setPlay(!play)}ref={controlsRef}>
              <h1 className="titulo-player">{titulo}</h1>
              {/*<div className="medio" onClick={() => {
                      setPlay(!play);
              }}>
      
      
              </div>*/}
              <div className="bottom-player">
                <div className="bottom-pannel mt-auto w-100 pb-3" onClick={(e)=>e.stopPropagation()}>
                <Slider
                  value={played*100}
                  onChange={handleChangePlayer}
                  onMouseDown={mouseDown}
                  onChangeCommitted={mouseUp}
                  aria-labelledby="continuous-slider"
                />
                <div className="d-flex align-items-center">
                  {play ? (
                    <img
                      src={Pausa}
                      alt=""
                      width="35px"
                      height="35px"
                      className="play-button"
                      onClick={() => {
                        setPlay(!play);
                      }}
                    />
                  ) : (
                    <img
                      src={Play}
                      alt=""
                      width="35px"
                      height="35px"
                      className="play-button"
                      onClick={() => {
                        setPlay(!play);
                      }}
                    />
                  )}
                  <div className="mute-button">
                    <img width="30px" src={speaker} alt="speaker" className="mx-2" onClick={()=>{
                      setMuted(!muted)
                      setValueVolume(0)
                      }}/>
                  </div>
                  <div id="volume-slider">
                    <Slider
                    min={0}
                    max={100}
                    value={valueVolume}
                    onChange={handleChangeVolumen}
                    aria-labelledby="continuous-slider"
                    />
                  </div>
                <img width="40px" src={fullscreen} className="ml-auto" onClick={()=>toggleFullScreen()}/>
                </div>
                </div>
              </div>
            </div>
          </div>
      </>
    );
}
export default Video;
