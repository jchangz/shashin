import React, {useState, useRef, useEffect} from 'react';
import {useTrail, useSpring, useSprings, a} from 'react-spring';

const camerarollroutes = [
  {url: 'https://live.staticflickr.com/65535/48034090387_d62885f35e_c.jpg', route: 'Kyoto'},
  {url: 'https://live.staticflickr.com/65535/48034089612_d49c757b5b_c.jpg', route: 'Japan'},
  {url: 'https://live.staticflickr.com/65535/48034089942_ebef0ec498_c.jpg', route: 'Asia'},
  {url: 'https://live.staticflickr.com/65535/48155183631_c48bd3c918_b.jpg', route: 'Random'}
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
  
const CameraRoll = ({childLoad})=> {

  //open child on img click
  const [route, setRoute] = useState(null);
  const routeName = useRef('');

  const [open, setOpen] = useState(null);

  const imageRef = useRef([])
  const [intersecting, setIntersecting] = useState(null);

  //logic for showing route content
  const selectImage = (e) => {
    const openRoute = e.target.className

    routeName.current = openRoute
    setOpen(true)
    if (openRoute === "Kyoto"){setRoute(camerarollkyoto)}
    if (openRoute === "Japan"){setRoute(camerarolljapan)}
  }

  //return to camera roll main
  const returnHome = () => {
    setOpen(null);
    //delay to remove content once transition finishes
    setTimeout(() => {
      setRoute(null)
    }, 475);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { 
          setIntersecting(entry.target.className) 
        }
      }, { root: null, rootMargin: "0px", threshold: 0.75 }
    );
   
    imageRef.current.forEach(image => {
      observer.observe(image);
    })

    return () => observer.disconnect();
  
  },[]);

  //slide in content
  const openRoute = useSpring({transform: open ? 'translateX(0)' : 'translateX(-100%)'})
  //animate main container
  const fadeOut = useSpring({opacity: open ? 0 : 1})
  const fadeIn = useSpring({opacity: open ? 1 : 0})
  //return button styling
  const openReturn = useSpring({color: open ? 'red' : 'white'})

  const springs = useSprings(camerarollroutes.length, camerarollroutes.map(
    ({route}, i) => (
      {height: intersecting === (camerarollroutes[i].route) ? 28 : 0}
    )
  ));

  return (
    <div className="cr">
      <div onClick={open ? returnHome : null} className="cr-title">
        <a.h2 style={openReturn}>Camera Roll</a.h2>
        <a.h2 style={fadeIn}>{routeName.current}</a.h2>
      </div>
      
      <a.div className="cr-grid" style={fadeOut}>
        {springs.map(({height}, i) =>
          <div onClick = {route ? null : (e) => selectImage(e)}>
            <img ref={ref => imageRef.current[i] = ref} 
              className={camerarollroutes[i].route} onLoad={childLoad}
              src={camerarollroutes[i].url} alt="" />
            <a.h4 style={{height}} >{camerarollroutes[i].route}</a.h4>
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