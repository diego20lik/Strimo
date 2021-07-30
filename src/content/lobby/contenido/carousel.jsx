import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as ReactLeft } from "../../images/iconmonstr-angel-left-thin.svg";
import { ReactComponent as ReactRight } from "../../images/iconmonstr-angel-right-thin.svg";
import "./lobby.css";
function Conciertos({ data }) {
  const ref = useRef(null);
  const [right, setRight] = useState(false);
  const [position, setPosition] = useState(false);
  const [left, setLeft] = useState(false);
  const checkScroll = () => {
    setPosition({
      scroll: ref.current.scrollLeft,
      width: ref.current.clientWidth,
    });
    if (ref.current.scrollLeft === 0) {
      setLeft(false);
    } else {
      setLeft(true);
    }
    if (
      ref.current.scrollLeft ===
      ref.current.scrollWidth - ref.current.clientWidth
    ) {
      setRight(false);
    } else {
      setRight(true);
    }
  };
  const handleScroll = (scroll) => {
    ref.current.scrollBy({ left: scroll, behavior: "smooth" });
    setTimeout(() => checkScroll(), 450);
  };
  useEffect(() => {
    checkScroll();
  }, []);
  return (
    <>
      <div className="section">
        <h3 className="titulo-seccion title-font font-title">{data.title}</h3>
        <div className="prueba">
          {left && <LeftScrollButton handleScroll={handleScroll} />}
          {right && <RightScrollButton handleScroll={handleScroll} />}
          {/* <PopUp /> */}
          <div className="carousel" ref={ref}>
            <InfiniteCarousel
              data={data}
              position={position}
              left={left}
              right={right}
              checkScroll={checkScroll}
            />
            <div className="final"></div>
          </div>
        </div>
      </div>
    </>
  );
}

const RightScrollButton = ({ handleScroll }) => {
  return (
    <div className="scroll-right" onClick={() => handleScroll(600)}>
      <ReactRight></ReactRight>
    </div>
  );
};
const LeftScrollButton = ({ handleScroll }) => {
  return (
    <div className="scroll-left" onClick={() => handleScroll(-600)}>
      <ReactLeft></ReactLeft>
    </div>
  );
};

//CORREGIR LO DE ABAJO

const ElementPosition = ({ element, position }) => {
  /* const elementRef = useRef(null)
    useEffect(()=>{
      if(elementRef.current.offsetLeft>position.scroll+(position.width*.2)&&elementRef.current.offsetLeft<((position.width*.7)+(position.scroll))){
        elementRef.current.style.transform = "scale(1.01)"
        return
      }
      elementRef.current.style.transform = "scale(0.99)"
    }, [elementRef, position.scroll]) */
  return <div style={{ transition: "all 1s" }}>{element}</div>;
};
export default Conciertos;
const InfiniteCarousel = ({ data, position, left, right, checkScroll }) => {
  const [arr, setArr] = useState(data.html);
  /* useEffect(()=>{
    arr.reverse().map(doc=>{
      setArr(arr=>[...arr, doc])
    })
  }, [])
  useEffect(()=>{
    if(!left){
      arr.reverse().map(doc=>{
        setArr(arr=>[ ...arr, doc])
        setArr(arr=>arr.pop())
      })
      console.log(arr);
    }
  }, [left]) */
  return (
    <>
      {arr.map((video) => {
        return video;
        // <ElementPosition element={video} position={position}/>
      })}
    </>
  );
};
