import React from "react";
import {Spring} from 'react-spring/renderprops'
import {Transition} from 'react-spring/renderprops'
import ImageLoader from '../hooks/lazyloadFadeIn.js';
import smoothscroll from 'smoothscroll-polyfill';
import LazyLoad from 'react-lazy-load';

const items = [
    'https://live.staticflickr.com/65535/48135300432_4ef5c106de_b.jpg', 
    'https://live.staticflickr.com/65535/48420919721_783b7335be_k.jpg', 
    'https://live.staticflickr.com/65535/48165937296_8e7afc1769_b.jpg',
    'https://live.staticflickr.com/65535/48155183631_c48bd3c918_b.jpg',
    'https://live.staticflickr.com/65535/48135206926_8d5ea89d81_c.jpg',
    'https://live.staticflickr.com/65535/48034021928_1942b50c84_c.jpg']

  const itemss =
  [
      "one"
    , "two"
    , "three"
    , "four"
    , "five"
    , "six"
  ]
  const classes =
  [
      "camerarollkyoto"
    , "camerarolltokyo"
    , "Article3"
    , "Article4"
    , "Article5"
  ]
  const titles =
  [
      "Camera Roll Kyoto"
    , "Tokyo"
    , "Article3"
    , "Article4"
    , "Article5"
  ]
  /*
  const subtitle =
  [
      "Kyoto through the lens of an iPhone"
    , "The city that never sleeps"
    , "Article3"
    , "Article4"
    , "Article5"
  ]
  const hero = ['https://live.staticflickr.com/1961/45173255361_a5653299af_b.jpg']
  /*const subtitle = [
    'http://167.99.106.90/img/camerarollkyotoorange.svg'
  ]*/

class ImageScroller extends React.Component {
    constructor(props){
        super(props);
        this.myInput = React.createRef();
        this.state = {
            data: null,
            title: "Hello",
            isScrolling: false,
            clicking: null,
            animation: null,
            mobileclick: 'nope'
        };
    }

    handleImageLoaded() {

        function imgLoad(url) {
          return new Promise(function(resolve, reject) {
            var img = new Image();
            img.src = url;
            img.onload = function() {
              resolve(img);
            }
            img.onerror = reject
          });
        }
    
        let imageLoadpromises = items.map(imgLoad);
    
        Promise.all(imageLoadpromises ).then(() => {
          this.setState({data: true});
          this.beginLoad();
        });
       
      }

    TouchMe = () => {
        var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

        if (supportsTouch === true){
            this.setState({touching : "yes"}, () => {console.log(this.state.touching)})
        }
        else {
            this.setState({touching : "no"}, () => {console.log(this.state.touching)})
        }
    }

    toggleScrolling = (isEnable) => {
        if (isEnable) {
            window.addEventListener('mousemove', this.onMouseMove);
            window.addEventListener('mouseup', this.onMouseUp);
        } else {
            window.removeEventListener('mousemove', this.onMouseMove);
        }
    };

    onMouseMove = (e) => {
        this.setState({clicking:false})
        const {clientX, clientY, scrollLeft, scrollTop} = this.state;
        this.myInput.current.scrollLeft = scrollLeft + (clientX*3) - (e.clientX*3);
        this.myInput.current.scrollTop  = scrollTop + (clientY*3) - (e.clientY*3);
  
    };

    onMouseDown = (e) => {
        var mousepos = null;
        const {scrollLeft, scrollTop} = this.myInput.current
        this.setState({
            isScrolling:    true, 
            mousePos:       mousepos, 
            clicked:        "yes", 
            scrollLeft, 
            scrollTop, 
            clientX:        e.clientX, 
            clientY:        e.clientY
        });
    };

    onMouseUp =  () => {
        this.setState({
            isScrolling:    false, 
            clicking:       true, 
            clicked:        "no", 
            animation:      null, 
            scrollLeft:     0, 
            scrollTop:      0,
            clientX:        0, 
            clientY:        0
        });

        this.myInput.current.scrollTo({
            left:           this.state.currentviewX, 
            top:            this.state.currentviewY, 
            behavior:       'smooth'
        })
    };

    beginLoad(){
        document.documentElement.style.setProperty('--base', (window.innerHeight - 64 + 'px'));
      
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const { isIntersecting } = entry
                if (isIntersecting === true ) {
                    this.setState({
                        title: entry.target.textContent, 
                        div: entry.target
                    })
                }
            })
        }, 
            {root:this.myInput.current, threshold: 0.75}
        );
 
        for (var i = 0; i < this.myInput.current.children.length; i++) {
            this.observer.observe(this.myInput.current.children[i]);
        }

        this.myInput.current.children[0].classList.add('click-state');

        smoothscroll.polyfill();

        this.TouchMe()
    }
   
    componentDidMount(){
        this.handleImageLoaded();
    }

    componentWillUnmount (){
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
    }
    
    ontouchstart = (e) => {
        if (this.state.mobileclick === "mob"){
            this.setState({mobileclick: "nope"})
            this.myInput.current.scrollTo({
                left:           e.target.offsetLeft - 32,
                top:            e.target.offsetTop - 86,
                behavior:       'smooth'
            })
            for (var i = 0; i < e.target.parentElement.children.length; i++) {
                e.target.parentElement.children[i].classList.remove('click-state');
            }
            e.target.classList.add('click-state');
        }

        else {
            this.setState({mobileclick: "mob"})
        }
    }

    render() {
        const togs = (this.state.mobileclick === "mob")

        if (!this.state.data) {
            return(
              <div>
                <div className="progress"></div>
                <div className="App">
                  <div className="loading-animated-background"></div>
                  <div className="loading-animated-background"></div>
                  <div className="loading-animated-background"></div>
                  <div className="loading-animated-background"></div>
                </div>
              </div>
            )
          }
          
     
        if (this.state.touching === "no") {
            return(
                <div className={"Appcon "+ this.state.animation + " " + this.state.clicking} onTouchEnd={this.onMouseUp} onMouseDown={this.onMouseDown}><div className="testcont">
                    <h1 className="testin">Japan</h1>
                    <Transition items={this.state.title}
              from={{ position: 'absolute', opacity: 0, transform: 'translate3d(0, 100%,0)' }}
              enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' }}
              leave={{ opacity: 0, transform: 'translate3d(0,100%,0)' }}>
            {item => props =>
                <h2 style={props} className="testinkid">{item}</h2>}</Transition>
                    </div>
                    <div className={"App " + this.state.clicked} ref={this.myInput}>{this.props.children}</div>
                </div>
            )
        }
        return(
            <div className={"Appcon"}>
                <div className="testcont">
                    <Transition items={this.state.title}
                        from={{ position: 'absolute', height: 0, background: 'white', overflow: 'hidden'}}
                        enter={{ height: 'auto', opacity: 1}}
                        leave={{ height: 0, opacity: 0 }}>
                        {item => props =>
                        <h2 style={props} className="testinkid">{item}</h2>}
                    </Transition>
                </div>

                <div className={"App mobile " + this.state.mobileclick} ref={this.myInput}>     
                    {items.map(({props }, index) => (
                        <Spring
                        from={{ opacity: 0 }}
                        to={{ opacity: togs ? 1 : 0,
                        transform: togs ? 'scale(0.9)' : 'scale(1)' }}>
                            {props => 
                        <div style={props} class={"japanp " + itemss[index] + " "}  onClick={this.ontouchstart}>
                            <div class={"reflow2"}>
                                <LazyLoad height={'100%'} >
                                    <ImageLoader className={"imghun " + itemss[index]} src={items[index]}/>
                                </LazyLoad>
                            </div>
                            <div className={"text "  + classes[index]}>
                                <h4>{titles[index]}</h4>
                            </div>       
                        </div>}
                        </Spring>
                    ))}
                </div>
            </div>
        )
    }
}

export default ImageScroller;