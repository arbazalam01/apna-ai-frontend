import React, { useState, useRef } from 'react';
import ReplayIcon from "@mui/icons-material/Replay";
import Styles from "./Slider.module.css"
import { Typography } from '@mui/material';

// Define the tag types and utility functions
const tagsData = [
  { name: "Awareness", color: "#F2F2F2" },
  { name: "Engagement", color: "#F2F2F2" },
  { name: "Thought-Leadership", color: "#F2F2F2" },
];

const getPercentage = (containerWidth, distanceMoved) => (distanceMoved / containerWidth) * 100;
const limitNumberWithinRange = (value, min, max) => Math.min(Math.max(value, min), max);
const nearestN = (N, number) => Math.ceil(number / N) * N;

// TagSection component
const TagSection = ({ name, color, width, onSliderSelect }) => {
  const style = {

    background: "#fff",
    width: `${width}%`,
    padding: 20,
    textAlign: 'center',
    position: 'relative',
    borderRight: '0.1em solid white',
    borderLeft: '0.1em solid white',
    boxSizing: 'border-box',
   
    marginTop:10
  };

  return (
    <div className="tag" style={style} onPointerDown={onSliderSelect}>
      <span style={{ color: '#242842', fontWeight: 500, userSelect: 'none', display: 'block', overflow: 'hidden',fontSize:"0.9rem", fontFamily: 'Figtree' }}> &nbsp; {name} {width.toFixed(0)}%</span>
      <div style={{
        width: '2em',
        height: '2em',
        backgroundColor: 'white',
        position: 'absolute',
        borderRadius: '2em',
        right: 'calc(-1.1em)',
        top: 0,
        bottom: 0,
        margin: 'auto',
        zIndex: 10,
        cursor: 'ew-resize',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none'
      }}>
        <img src="https://www.vhv.rs/dpng/d/82-824057_drag-cursor-png-transparent-png.png" alt="Drag handle" height="45%" />
      </div>
    </div>
  );
};

// TagSlider component
const TagSlider = ({widths,setWidths,sendDataToParent}) => {
 
  const [tags, setTags] = useState(tagsData);
  const tagSliderRef = useRef(null);

  const handleSliderSelect = (index) => (e) => {
    e.preventDefault();
    document.body.style.cursor = "ew-resize";

    const startDragX = e.pageX;
    const sliderWidth = tagSliderRef.current.offsetWidth;

    const resize = (e) => {
      e.preventDefault();
      const endDragX = e.touches ? e.touches[0].pageX : e.pageX;
      const distanceMoved = endDragX - startDragX;
      const maxPercent = widths[index] + widths[index + 1];

      const percentageMoved = nearestN(1, getPercentage(sliderWidth, distanceMoved));

      const newWidths = [...widths];
      newWidths[index] = limitNumberWithinRange(widths[index] + percentageMoved, 0, maxPercent);
      newWidths[index + 1] = limitNumberWithinRange(widths[index + 1] - percentageMoved, 0, maxPercent);
     
      sendDataToParent(newWidths);
    };

    const stopResize = (e) => {
      e.preventDefault();
      document.body.style.cursor = "initial";
      window.removeEventListener("pointermove", resize);
      window.removeEventListener("touchmove", resize);
      window.removeEventListener("pointerup", stopResize);
      window.removeEventListener("touchend", stopResize);
    };

    window.addEventListener("pointermove", resize);
    window.addEventListener("touchmove", resize);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("touchend", stopResize);
  };

  return (
    <div>
      <div ref={tagSliderRef} style={{ width: '100%', display: 'flex', backgroundColor: '#fff' }}>
        {tags.map((tag, index) => (
          <TagSection key={index} width={widths[index]} name={<Typography sx={{display: 'inline',fontWeight:"500"}}>{tag.name}</Typography>} color={tag.color} onSliderSelect={handleSliderSelect(index)} />
        ))}
      </div>
      <button className={Styles.reset_btn} onClick={() => {
        setTags(tagsData);
        setWidths(new Array(tags.length).fill(100 / tags.length));
      }}><ReplayIcon sx={{fontSize:'1.1rem'}} /> &nbsp; Reset</button>
      
    </div>
  );
};

export default TagSlider;
