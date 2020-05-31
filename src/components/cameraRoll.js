import React, {useState, useRef} from 'react';
import {useTrail, useSpring, a} from 'react-spring';

const camerarollroutes = [
  {url: 'https://live.staticflickr.com/65535/48034090387_d62885f35e_c.jpg', route: 'kyoto'},
  {url: 'https://live.staticflickr.com/65535/48034089612_d49c757b5b_c.jpg', route: 'japan'},
  {url: 'https://live.staticflickr.com/65535/48034089942_ebef0ec498_c.jpg', route: 'asia'},
  {url: 'https://live.staticflickr.com/65535/48155183631_c48bd3c918_b.jpg', route: 'random'}
]

const camerarollkyoto = [
  {url: 'https://live.staticflickr.com/65535/49936657476_87956c2d9b_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936657476_87956c2d9b_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936657476_87956c2d9b_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936657476_87956c2d9b_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936657476_87956c2d9b_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936657476_87956c2d9b_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936657476_87956c2d9b_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936657476_87956c2d9b_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936657476_87956c2d9b_w.jpg'},
]

const camerarolljapan = [
  {url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg'},
  {url: 'https://live.staticflickr.com/65535/49936951732_a1c904d102_w.jpg'},
]

function CameraRollContent ({content}) {

  //preloading images
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);

  //fadeout placeholder animation
  const fadeOut = useSpring({opacity: loading ? 1 : 0})

  //trail animation for images
  const trail = useTrail(content.length, {opacity: loading ? 0 : 1})

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= content.length) {
      setLoading(false);
    }
  }

  return (
    <div className="cr-content">
      <div className="cr-content-grid" >
        {trail.map((spring , index) =>
          <a.img className={content[index].name} onLoad={imageLoaded} style={spring} src={content[index].url} alt="" />
        )}
      </div>
      <div className="cr-content-loader">
        <a.div className={"progress-animation " + (loading ? "" : "fin")} style={fadeOut} />
        <div className="cr-content-grid skeleton">
          {[...Array(9)].map((i) => <div key={i}></div>)}
        </div> 
      </div>
    </div>
  )
}
  
const CameraRoll = ()=> {

  //open child on img click
  const [route, setRoute] = useState(null);
  const [open, setOpen] = useState(null);

  //logic for showing route content
  const selectImage = (e) => {
    setOpen(true)
    const openRoute = e.target.className
    if (openRoute === "kyoto"){setRoute(camerarollkyoto)}
    if (openRoute === "japan"){setRoute(camerarolljapan)}
  }

  //return to camera roll main
  const returnHome = () => {
    setOpen(null);
    //delay to remove content once transition finishes
    setTimeout(() => {
      setRoute(null)
    }, 475);
  }

  //slide in content
  const openRoute = useSpring({transform: open ? 'translateX(0)' : 'translateX(-100%)'})
  //animate main container
  const openEffect = useSpring({transform: open ? 'translateX(-100%)' : 'translateX(0%)'})
  //return button styling
  const openReturn = useSpring({color: open ? 'blue' : 'white'})

  return (
    <div className="cr">
      <a.h2 onClick={open ? returnHome : null} style={openReturn}>Camera Roll</a.h2>
      <a.div className="cr-grid" style={openEffect}>
        {camerarollroutes.map(item =>
          <div onClick = {route ? null : (e) => selectImage(e)}>
            <img className={item.route} src={item.url} alt="" />
          </div>
        )}
      </a.div>
      <a.div className="cr-container" style={openRoute}>
        {route ? <CameraRollContent content={route}/> : null}
      </a.div>
    </div>
  )
}

export default CameraRoll;